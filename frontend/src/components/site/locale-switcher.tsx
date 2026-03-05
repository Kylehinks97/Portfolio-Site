"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, localeLabels, localeNames } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  currentLocale: Locale;
  label: string;
};

export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const restPath = segments.slice(1).join("/");

  return (
    <nav
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/6 p-1 backdrop-blur"
    >
      {Object.entries(localeLabels).map(([locale, shortLabel]) => {
        const target = restPath ? `/${locale}/${restPath}` : `/${locale}`;
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            aria-label={localeNames[locale as Locale]}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.22em] uppercase transition-colors",
              isActive
                ? "bg-white text-slate-950"
                : "text-muted-foreground hover:text-foreground",
            )}
            href={target}
          >
            {shortLabel}
          </Link>
        );
      })}
    </nav>
  );
}
