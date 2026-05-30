"use client";

import { useActionState } from "react";
import Link from "next/link";
import { FourOFourAccessAction } from "./action";

export default function XPage() {
  const [state, action, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => FourOFourAccessAction(formData),
    null,
  );

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center text-neutral-800 font-sans bg-[var(--auf-off-white)] bg-[radial-gradient(circle,_rgba(24,87,206,0.1)_1px,_transparent_1px)] bg-[length:28px_28px]" 
      aria-hidden="true"
    >
      {/* 2601-next Content */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">2601 - Testing Failed</h1>
        <p className="text-sm text-neutral-500">The page you are looking for doesn't exist.</p>
        <div className="pt-2">
          <Link 
            href="/" 
            className="text-xs text-neutral-400 underline underline-offset-4 transition-colors hover:text-neutral-600"
          >
            Go back home
          </Link>
        </div>
      </div>

      {/* Hidden Dev Access Form */}
      <form action={action}>
        <input
          name="token"
          type="password"
          autoComplete="off"
          className="fixed bottom-4 right-20 w-48 rounded bg-white px-2 py-1 text-xs text-neutral-700 opacity-20 outline-none transition-opacity focus:opacity-100 focus:ring-1 focus:ring-neutral-300"
          placeholder=""
        />
        <button
          type="submit"
          disabled={pending}
          className="fixed bottom-4 right-4 rounded px-2 py-1 text-[10px] text-neutral-300 opacity-10 transition-opacity hover:opacity-60 disabled:opacity-5"
        >
          {pending ? "…" : "→"}
        </button>
        {state && !state.ok && (
          <span className="fixed bottom-10 right-4 text-[10px] text-red-400 opacity-60">
            ✗
          </span>
        )}
      </form>
    </div>
  );
}