import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";

type SiteHeaderProps = {
  locale: Locale;
  messages: Messages;
};

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  const navLinks = [
    { href: `/${locale}`, label: messages.nav.home },
    { href: `/${locale}/projects`, label: messages.nav.projects },
    {
      href: `/${locale}/qualifications`,
      label: messages.nav.qualifications,
    },
    { href: `/${locale}/contact`, label: messages.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link
          className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.24em] uppercase"
          href={`/${locale}`}
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-base tracking-normal">
            K
          </span>
          <span className="hidden text-foreground/90 sm:inline">Kyle</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
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
        </div>
      </div>
    </header>
  );
}
