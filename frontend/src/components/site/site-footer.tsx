"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Mail} from "lucide-react";
import ContactButton from "@/components/site/contact-button";

type SiteFooterProps = {
  locale: Locale;
  messages: Messages;
};

export function SiteFooter({ locale, messages }: SiteFooterProps) {
  const pathname = usePathname();
  const normalizePath = (path: string) =>
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  const currentPath = normalizePath(pathname || "/");
  const navLinks = [
    { href: `/${locale}`, label: messages.nav.home, exact: true },
    { href: `/${locale}/about-me`, label: messages.nav.aboutMe, exact: false },
    { href: `/${locale}/projects`, label: messages.nav.projects, exact: false },
  ];

  return (
    <footer className="hidden border-t border-white/8 lg:block">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p>{messages.footer.line}</p>
        <div className="flex items-center gap-5">
          {navLinks.map((link) => {
            const linkPath = normalizePath(link.href);
            const isActive = link.exact
              ? currentPath === linkPath
              : currentPath === linkPath ||
                currentPath.startsWith(`${linkPath}/`);

            return (
              <Link
                key={link.href}
                className={cn(
                  "relative inline-flex rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                  isActive
                    ? "bg-primary text-white! hover:bg-primary/90 hover:shadow-[0_14px_45px_rgba(244,114,182,0.22)]"
                    : "text-muted-foreground hover:text-foreground after:absolute after:right-3 after:bottom-1 after:left-3 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100",
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <ContactButton messages={messages} locale={locale} />
      </div>
    </footer>
  );
}
