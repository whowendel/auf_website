"use client";

import { useState, useTransition } from "react";
import {
  signInWithCredentialsAction,
  signInWithGoogleAction,
} from "@/server/actions/auth";

function NavyInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="block w-full rounded-lg border border-auf-border bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-auf-muted/50 focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/10 disabled:opacity-60"
    />
  );
}

function FieldLabel({
  label,
  required,
  children,
  error,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string | null;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}

export function LoginForm({ googleEnabled }: { googleEnabled: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      {/* Google SSO */}
      {googleEnabled && (
        <>
          <form action={signInWithGoogleAction}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-auf-border bg-white px-4 py-2.5 text-sm font-medium text-navy shadow-sm transition-colors hover:bg-off-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <div className="relative my-1 text-center">
            <span className="relative z-10 bg-white px-3 text-[11px] text-auf-muted">or</span>
            <div className="absolute inset-x-0 top-1/2 z-0 h-px bg-auf-border" />
          </div>
        </>
      )}

      {/* Credentials */}
      <form
        action={(fd) => {
          setError(null);
          startTransition(async () => {
            const result = await signInWithCredentialsAction(fd);
            if (result && !result.ok) setError(result.error);
          });
        }}
        className="space-y-4"
      >
        <FieldLabel label="Email address" required>
          <NavyInput
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="admin@auf.edu.ph"
          />
        </FieldLabel>

        <FieldLabel label="Password" required error={error}>
          <NavyInput
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            placeholder="••••••••"
          />
        </FieldLabel>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <>
              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
}
