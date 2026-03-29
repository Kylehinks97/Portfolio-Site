"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";
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
    <footer className="hidden border-t border-border lg:block">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <p className="text-sm text-muted-foreground">{messages.footer.line}</p>
        <div className="flex items-center gap-1">
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
                  "nav-underline relative inline-flex px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "active text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
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
