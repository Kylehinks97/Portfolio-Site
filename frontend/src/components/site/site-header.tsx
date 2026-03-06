 "use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CvDownloadDropdown } from "@/components/site/cv-download-dropdown";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";
import Image from "next/image";

type SiteHeaderProps = {
  locale: Locale;
  messages: Messages;
};

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  const pathname = usePathname();
  const normalizePath = (path: string) =>
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  const currentPath = normalizePath(pathname || "/");

  const navLinks = [
    { href: `/${locale}`, label: messages.nav.home, exact: true },
    { href: `/${locale}/about-me`, label: messages.nav.aboutMe, exact: false },
    { href: `/${locale}/projects`, label: messages.nav.projects, exact: false },
    {
      href: `/${locale}/qualifications`,
      label: messages.nav.qualifications,
      exact: false,
    },
    { href: `/${locale}/contact`, label: messages.nav.contact, exact: false },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link
          className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.24em] uppercase"
          href={`/${locale}`}
        >
          <span className="flex size-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/8 text-base tracking-normal">
            <Image src="/images/profile-pic.webp" width={100} height={100} alt="Profile of Kyle Hinks"/>
          </span>
          <span className="hidden text-foreground/90 sm:inline">Kyle</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
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
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_14px_45px_rgba(244,114,182,0.22)]"
                    : "text-muted-foreground hover:text-foreground after:absolute after:right-3 after:bottom-1 after:left-3 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100",
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher
            currentLocale={locale}
            label={messages.common.language}
          />
          <Button asChild className="hidden sm:inline-flex" size="lg">
            <Link href={`/${locale}/contact`}>
              {messages.nav.contact}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <CvDownloadDropdown locale={locale} messages={messages} />
        </div>
      </div>
    </header>
  );
}
