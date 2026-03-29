"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, localeNames } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  currentLocale: Locale;
  label: string;
  className?: string;
};

export function LocaleSwitcher({
  currentLocale,
  label,
  className,
}: LocaleSwitcherProps) {
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
    <nav aria-label={label} className={className}>
      <Link
        href={nextTarget}
        aria-label={`Switch language to ${localeNames[nextLocale]}`}
        className="inline-flex items-center gap-0.5 rounded-md border border-border bg-secondary p-1"
      >
        {(["en", "es"] as const).map((locale) => {
          const isActive = locale === currentLocale;
          return (
            <span
              key={locale}
              aria-hidden="true"
              className={cn(
                "inline-flex h-7 w-9 items-center justify-center rounded text-base transition-colors",
                isActive
                  ? "bg-card text-foreground shadow-sm"
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
