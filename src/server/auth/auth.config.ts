import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { Role } from "@prisma/client";
import { isGoogleSsoEnabled, env } from "@/lib/env";

// Edge-safe Auth.js config (no DB / no bcrypt).
// Used by middleware. The Credentials provider lives in ./auth.ts (Node runtime).
export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
  providers: isGoogleSsoEnabled
    ? [
        Google({
          clientId: env.GOOGLE_CLIENT_ID!,
          clientSecret: env.GOOGLE_CLIENT_SECRET!,
          authorization: { params: { prompt: "select_account" } },
        }),
      ]
    : [],
  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const isAdmin = pathname.startsWith("/admin");
      if (!isAdmin) return true;
      return Boolean(auth?.user);
    },
    async jwt({ token, user }) {
      if (user) {
        const u = user as { role?: Role; collegeId?: string | null };
        if (u.role !== undefined) (token as Record<string, unknown>).role = u.role;
        if (u.collegeId !== undefined) (token as Record<string, unknown>).collegeId = u.collegeId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const t = token as Record<string, unknown>;
        session.user.id = (t.sub as string) ?? session.user.id;
        if (t.role !== undefined) session.user.role = t.role as Role;
        if (t.collegeId !== undefined) session.user.collegeId = t.collegeId as string | null;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const email = (profile as { email?: string } | undefined)?.email;
        if (!email) return false;
        const domain = email.split("@")[1]?.toLowerCase();
        if (domain !== env.AUTH_GOOGLE_ALLOWED_DOMAIN.toLowerCase()) return false;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
