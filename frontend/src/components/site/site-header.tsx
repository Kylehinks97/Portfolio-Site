"use client";

import { Menu } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-10">
        {/* Logo / wordmark */}
        <Link
          className="inline-flex items-center gap-3 font-semibold tracking-tight"
          href={`/${locale}`}
        >
          <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary">
            <Image
              src="/images/profile-pic.webp"
              width={80}
              height={80}
              alt="Profile of Kyle Hinks"
              loading="eager"
            />
          </span>
          <span className="text-sm text-foreground">Kyle Hinks</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
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
                  "nav-underline relative inline-flex px-3 py-2 text-sm transition-colors",
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
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitcher
            currentLocale={locale}
            label={messages.common.language}
          />
          <ContactButton messages={messages} locale={locale} />
          <CvDownloadDropdown locale={locale} messages={messages} />
        </div>

        {/* Mobile menu */}
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
              <SheetTitle>
                <span className="text-sm font-semibold tracking-tight">KYLE HINKS</span>
              </SheetTitle>
              <SheetDescription className="sr-only">Navigation menu</SheetDescription>
            </MobileSheetHeader>
            <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-6">
              <nav className="flex flex-col gap-1">
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
                          "rounded-md px-4 py-3 text-base transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-foreground hover:bg-secondary",
                        )}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="flex flex-col gap-3">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href={`/${locale}/contact`}>
                      {messages.nav.contact}
                    </Link>
                  </Button>
                </SheetClose>
                <MobileCvDownload locale={locale} messages={messages} />
              </div>
              <div className="flex items-center">
                <LocaleSwitcher
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
