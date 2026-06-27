"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { university } from "@/data/colleges";
import { AufLogo } from "@/components/public/nav/auf-logo";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const NPC_SEAL_URL =
  "https://npcregistration.privacy.gov.ph/certificate/organizationRegistration/63ec52a16733827aab83e35c";

/**
 * University-wide footer. Hidden automatically on college microsite paths
 * (/c/<slug>), since microsites render their own MicrositeFooter.
 */
export function SiteFooter() {
  const pathname = usePathname() ?? "";
  const isMicrosite = pathname.startsWith("/c/");
  if (isMicrosite) return null;

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <AufLogo href="/" className="justify-start" />
              <a
                href={NPC_SEAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-16 w-16 shrink-0"
              >
                <Image
                  src="/assets/auf-data-privacy-seal.png"
                  alt="National Privacy Commission Seal of Registration"
                  fill
                  className="object-contain"
                />
              </a>
            </div>
            <p className="max-w-[22ch] text-xs leading-relaxed text-white/55">
              {university.tagline}
            </p>
            <p className="mt-4 text-xs text-white/40">{university.address}</p>
          </div>

          {/* About */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--auf-gold)]">
              About
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              {["History & Heritage", "Vision & Mission", "Administration", "Accreditations"].map(
                (label) => (
                  <li key={label}>
                    <Link href="/about" className="hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--auf-gold)]">
              Admissions
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              {["How to Apply", "Scholarships", "Academic Calendar", "Registrar"].map((label) => (
                <li key={label}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--auf-gold)]">
              Contact
            </p>
            <ul className="space-y-2 text-xs text-white/60">
              <li>{university.phone}</li>
              <li>
                <a
                  href={`mailto:${university.email}`}
                  className="hover:text-white transition-colors"
                >
                  {university.email}
                </a>
              </li>
              <li className="pt-4">
                <div className="flex items-center gap-4">
                  {university.socialLinks?.facebook && (
                    <a
                      href={university.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <FaFacebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                  )}
                  {university.socialLinks?.linkedin && (
                    <a
                      href={university.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <FaLinkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  )}
                  {university.email && (
                    <a
                      href={`mailto:${university.email}`}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <MdEmail className="h-5 w-5" />
                      <span className="sr-only">Gmail</span>
                    </a>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <p className="text-[11px] text-white/35">
            © {new Date().getFullYear()} {university.name}. All rights reserved. MJS - MJC
          </p>
          <div className="flex gap-5 text-[11px] text-white/35">
            <Link href="#" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/login" className="hover:text-white/70 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
