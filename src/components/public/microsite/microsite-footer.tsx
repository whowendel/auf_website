import Link from "next/link";
import Image from "next/image";
import type { College } from "@/data/colleges";
import { university } from "@/data/colleges";

export function MicrositeFooter({ college }: { college: College }) {
  return (
    <footer className="bg-[var(--auf-navy)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* AUF brand */}
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 shrink-0">
              <Image
                src="/assets/auf-logo-only.png"
                alt="AUF"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white">AUF</p>
              <p className="text-[10px] text-white/40">{college.name}</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-5 text-xs text-white/40">
            <Link href="/" className="hover:text-white transition-colors">
              AUF Home
            </Link>
            <Link href="/admissions/how-to-apply" className="hover:text-white transition-colors">
              Admissions
            </Link>
            <a
              href={`mailto:${college.contact.email ?? university.email}`}
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
            <Link href="/login" className="hover:text-white/70 transition-colors">
              Admin
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} {university.name}. All rights reserved.
          </p>
          <p className="text-[10px] text-white/20">
            {college.name} — {university.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
