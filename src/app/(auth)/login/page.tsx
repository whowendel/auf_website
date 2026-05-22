import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth/auth";
import { isGoogleSsoEnabled } from "@/lib/env";
import { LoginForm } from "./login-form";
import { LoginSlider } from "./login-slider";

export const metadata = { title: "Sign in — AUF Admin" };

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin/dashboard");

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      {/* ── Left: Form panel ─────────────────────────────────────────── */}
      <div className="flex flex-col bg-white px-8 py-10 md:px-12 lg:px-14">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0">
            <Image
              src="/assets/auf-logo-only.png"
              alt="AUF"
              fill
              className="object-contain"
              sizes="36px"
              priority
            />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-navy/40">
              Admin Portal
            </p>
            <p className="font-display text-sm font-semibold text-navy">
              Angeles University Foundation
            </p>
          </div>
        </div>

        {/* Form — vertically centered */}
        <div className="my-auto w-full mx-auto py-12 lg:max-w-[460px]">
          <h1 className="font-display text-2xl font-light text-navy md:text-[28px]">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-auf-muted">
            Sign in to manage AUF&apos;s digital presence, posts, and approvals.
          </p>

          <div className="mt-2 h-0.5 w-8 bg-gold" />

          <div className="mt-8">
            <LoginForm googleEnabled={isGoogleSsoEnabled} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px]">
          <Link
            href="/"
            className="flex items-center gap-1 text-auf-muted transition-colors hover:text-navy"
          >
            ← Return to AUF website
          </Link>
          <span className="text-auf-muted/40">
            &copy; {new Date().getFullYear()} AUF
          </span>
        </div>
      </div>

      {/* ── Right: Slider panel ───────────────────────────────────────── */}
      <div className="relative hidden bg-navy lg:block">
        <LoginSlider />
      </div>
    </div>
  );
}
