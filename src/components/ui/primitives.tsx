import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Button ──────────────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-400",
  secondary: "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
};
const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    />
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <Link
      href={href}
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}

// ─── Input / Textarea / Field ────────────────────────────────────────
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500",
          className,
        )}
      />
    );
  },
);

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      {...props}
      className={cn(
        "block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500",
        className,
      )}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      {...props}
      className={cn(
        "block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500",
        className,
      )}
    >
      {children}
    </select>
  );
});

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-700">
        {label}
        {required ? <span className="ml-0.5 text-red-600">*</span> : null}
      </span>
      {children}
      {hint && !error ? <span className="mt-1 block text-xs text-neutral-500">{hint}</span> : null}
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

// ─── Card / PageHeader ────────────────────────────────────────────────
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-lg border border-neutral-200 bg-white p-6 shadow-sm",
        className,
      )}
    />
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
        {description ? <p className="mt-1 text-sm text-neutral-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex gap-2">{actions}</div> : null}
    </div>
  );
}

// ─── Status badge ────────────────────────────────────────────────────
const STATUS_TONES: Record<string, string> = {
  DRAFT:             "bg-neutral-200 text-neutral-800",
  PENDING_REVIEW:    "bg-amber-100 text-amber-900",
  CHANGES_REQUESTED: "bg-orange-100 text-orange-900",
  APPROVED:          "bg-sky-100 text-sky-900",
  PUBLISHED:         "bg-emerald-100 text-emerald-900",
  REJECTED:          "bg-red-100 text-red-900",
  ARCHIVED:          "bg-neutral-300 text-neutral-700",
  SUPER_ADMIN:       "bg-purple-100 text-purple-900",
  COLLEGE_ADMIN:     "bg-sky-100 text-sky-900",
  COLLEGE_EDITOR:    "bg-neutral-200 text-neutral-800",
};

export function Badge({ children, tone }: { children: string; tone?: string }) {
  const cls = STATUS_TONES[tone ?? children] ?? "bg-neutral-200 text-neutral-800";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        cls,
      )}
    >
      {children.replace(/_/g, " ")}
    </span>
  );
}

// ─── Alert / EmptyState ──────────────────────────────────────────────
export function Alert({
  tone = "info",
  children,
}: {
  tone?: "info" | "success" | "error";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "error"
      ? "bg-red-50 border-red-200 text-red-900"
      : tone === "success"
        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
        : "bg-sky-50 border-sky-200 text-sky-900";
  return (
    <div className={cn("rounded-md border px-3 py-2 text-sm", toneClass)}>{children}</div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-10 text-center">
      <h3 className="text-base font-medium text-neutral-900">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm text-neutral-600">{description}</p>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
