import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";

type SiteFooterProps = {
  locale: Locale;
  messages: Messages;
};

export function SiteFooter({ locale, messages }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p>{messages.footer.line}</p>
        <div className="flex items-center gap-5">
          <Link href={`/${locale}`}>{messages.nav.home}</Link>
          <Link href={`/${locale}/projects`}>{messages.nav.projects}</Link>
          <Link href={`/${locale}/qualifications`}>
            {messages.nav.qualifications}
          </Link>
          <Link href={`/${locale}/contact`}>{messages.nav.contact}</Link>
        </div>
      </div>
    </footer>
  );
}
