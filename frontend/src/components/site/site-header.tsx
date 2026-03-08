"use client";

import {ArrowUpRight, Mail, Menu} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CvDownloadDropdown } from "@/components/site/cv-download-dropdown";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { MobileCvDownload } from "@/components/site/mobile-cv-download";
import { Button } from "@/components/ui/button";
import {
  SheetHeader as MobileSheetHeader,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";
import ContactButton from "@/components/site/contact-button";

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
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link
          className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.24em] uppercase"
          href={`/${locale}`}
        >
          <span className="flex size-14 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/8 text-base tracking-normal md:size-16 lg:size-20">
            <Image
              src="/images/profile-pic.webp"
              width={100}
              height={100}
              alt="Profile of Kyle Hinks"
              loading="eager"
            />
          </span>
          <span className="text-foreground/90">Kyle Hinks</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
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

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher
            currentLocale={locale}
            label={messages.common.language}
          />
          <ContactButton messages={messages} locale={locale} />
          <CvDownloadDropdown locale={locale} messages={messages} />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Open navigation menu"
              className="lg:hidden"
              size="icon"
              type="button"
              variant="secondary"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="lg:hidden">
            <MobileSheetHeader className="pr-14">
              <SheetTitle className="flex justify-between items-center"><strong>KYLE HINKS</strong></SheetTitle>
            </MobileSheetHeader>
            <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-6">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const linkPath = normalizePath(link.href);
                  const isActive = link.exact
                    ? currentPath === linkPath
                    : currentPath === linkPath ||
                      currentPath.startsWith(`${linkPath}/`);

                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        className={cn(
                          "rounded-2xl px-4 py-3 text-base transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "border border-white/10 bg-white/4 text-foreground/90 hover:bg-white/8",
                        )}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="flex flex-col gap-4">
                <SheetClose asChild>
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/${locale}/contact`}>
                      {messages.nav.contact}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </SheetClose>
                <MobileCvDownload locale={locale} messages={messages} />
              </div>
              <div className="flex justify-center items-center">
                <LocaleSwitcher
                    className="w-fit"
                    currentLocale={locale}
                    label={messages.common.language}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
