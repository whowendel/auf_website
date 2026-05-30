"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { signOutAction } from "@/server/actions/auth";
import { Badge } from "@/components/ui/primitives";
import { Toaster } from "@/components/ui/sonner";
import { AdminNav } from "./admin-nav";

type NavItem = { href: string; label: string };

export function AdminShell({
  userName,
  userRole,
  navItems,
  children,
}: {
  userName: string;
  userRole: string;
  navItems: NavItem[];
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const close = () => setDrawerOpen(false);

  return (
    <div className="admin-bg relative flex min-h-screen">
      {/* ── Desktop sidebar ──────────────────────────────────────── */}
      <aside className="hidden w-60 shrink-0 flex-col bg-navy sm:flex">
        <div className="border-b border-white/10 px-5 py-4">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/auf-logo-with-text.png"
              alt="AUF"
              className="w-36"
            />
          </Link>
        </div>
        <AdminNav items={navItems} />
      </aside>

      {/* ── Mobile drawer ────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />
          {/* Panel */}
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-navy shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Link href="/" onClick={close}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/auf-logo-with-text.png"
                  alt="AUF"
                  className="w-32 brightness-0 invert"
                />
              </Link>
              <button
                onClick={close}
                className="rounded p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>
            <AdminNav items={navItems} onNavigate={close} />
          </aside>
        </div>
      )}

      {/* ── Main column ──────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-auf-border bg-white/90 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              className="rounded-md p-1.5 text-navy/60 transition-colors hover:bg-navy/5 hover:text-navy sm:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0 truncate text-sm text-auf-muted">
              <span className="hidden sm:inline">Signed in as </span>
              <span className="font-medium text-navy">{userName}</span>
              <span className="ml-2 hidden sm:inline-block">
                <Badge tone={userRole}>{userRole}</Badge>
              </span>
            </div>
          </div>

          <form action={signOutAction} className="shrink-0">
            <button
              type="submit"
              className="rounded-md border border-navy/20 px-3 py-1.5 text-xs font-medium text-navy/70 transition-colors hover:bg-navy/5 hover:text-navy"
            >
              <LogOut size={16} />
            </button>
          </form>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>

      {/* ── Great Dane mascot — bottom-right watermark ───────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/great-dane.png"
        alt=""
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 w-56 select-none"
        style={{ opacity: 0.1, mixBlendMode: "multiply" }}
      />

      <Toaster richColors position="bottom-right" />
    </div>
  );
}
