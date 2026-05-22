// QXV0aG9yczogTWFyayBKZXJvbWUgU2FudG9zIGFuZCBNYXJjdXMgSmVyZW15IENhcmnDsW8

import NextAuth from "next-auth";
import { authConfig } from "@/server/auth/auth.config";

// Auth.js v5 edge middleware. Uses the edge-safe config (no Prisma/bcrypt).
export const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  // The `authorized` callback in authConfig already gates /admin.
  // This middleware also serves as the tenant-resolution hook: when we
  // later switch from path-based (/c/<slug>) to subdomain-based microsites,
  // we'll read req.nextUrl.host here and rewrite to /c/<slug>.
  void req;
});

export const config = {
  matcher: [
    // Skip Next.js internals + static assets.
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
