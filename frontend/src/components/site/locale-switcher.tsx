"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, localeNames } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  currentLocale: Locale;
  label: string;
};

export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const restPath = segments.slice(1).join("/");
  const nextLocale: Locale = currentLocale === "en" ? "es" : "en";
  const nextTarget = restPath ? `/${nextLocale}/${restPath}` : `/${nextLocale}`;
  const localeFlags: Record<Locale, string> = {
    en: "🇬🇧",
    es: "🇪🇸",
  };

  return (
    <nav aria-label={label}>
      <Link
        href={nextTarget}
        aria-label={`Switch language to ${localeNames[nextLocale]}`}
        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/6 p-1 backdrop-blur"
      >
        {(["en", "es"] as const).map((locale) => {
          const isActive = locale === currentLocale;
          return (
            <span
              key={locale}
              aria-hidden="true"
              className={cn(
                "inline-flex h-8 w-10 items-center justify-center rounded-full text-lg transition-colors",
                isActive
                  ? "bg-white text-slate-950"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {localeFlags[locale]}
            </span>
          );
        })}
      </Link>
    </nav>
  );
}
