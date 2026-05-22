"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/public/nav/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { SplashScreen } from "@/components/public/splash-screen";
import { ChatbotWidget } from "@/components/public/chatbot/chatbot-widget";
import { useScrolled } from "@/hooks/use-scrolled";

type PublicShellProps = {
    children: React.ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const hasScrolled = useScrolled(60, true);

    return (
        <div className="flex min-h-screen flex-col bg-background">
        <SplashScreen />
        {/* SiteHeader is pathname-aware — solid on /c/* microsite paths */}
        <SiteHeader
            transparent
            menuOpen={menuOpen}
            onMenuOpenChange={setMenuOpen}
        />

        <main className="flex-1">{children}</main>

        {!menuOpen && hasScrolled && <ChatbotWidget />}

        {/* SiteFooter auto-hides on /c/* microsite paths */}
        <SiteFooter />
        </div>
    );
}
