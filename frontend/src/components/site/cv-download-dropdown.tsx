"use client";

import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

type CvDownloadDropdownProps = {
  locale: Locale;
  messages: Messages;
  className?: string;
};

const cvFileByLanguage: Record<Locale, string> = {
  en: "/CV/Kyle Hinks CV English.pdf",
  es: "/CV/Kyle Hinks CV Spanish.pdf",
};

export function CvDownloadDropdown({
  locale,
  messages,
  className,
}: CvDownloadDropdownProps) {
  const [selectedCvLanguage, setSelectedCvLanguage] = useState<Locale>(
    locale === "es" ? "es" : "en",
  );

  const languageOptions: Array<{ value: Locale; label: string }> = [
    { value: "en", label: messages.nav.cvEnglishOption },
    { value: "es", label: messages.nav.cvSpanishOption },
  ];

  const languageSelector = (groupName: string) => (
    <div
      aria-label={messages.nav.cvLanguagePrompt}
      className="grid grid-cols-2 gap-2"
      role="radiogroup"
    >
      {languageOptions.map((option) => {
        const isSelected = selectedCvLanguage === option.value;
        return (
          <label
            key={`${groupName}-${option.value}`}
            className={cn(
              "cursor-pointer rounded-xl border px-3 py-2 text-center text-sm transition-colors",
              isSelected
                ? "border-primary bg-primary/20 text-foreground"
                : "border-white/12 bg-white/4 text-muted-foreground hover:text-foreground",
            )}
          >
            <input
              checked={isSelected}
              className="sr-only"
              name={groupName}
              onChange={() => setSelectedCvLanguage(option.value)}
              type="radio"
              value={option.value}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );

  const panelContent = (
    <>
      <p className="mb-2 text-xs text-muted-foreground">
        {messages.nav.cvLanguagePrompt}
      </p>
      {languageSelector("cv-language")}
      <Button asChild className="mt-3 w-full py-6">
        <a download href={cvFileByLanguage[selectedCvLanguage]}>
          {messages.nav.cvDownloadButton}
          <DownloadIcon className="size-4" />
        </a>
      </Button>
    </>
  );

  return (
    <>
      <div className={cn("group relative hidden sm:block", className)}>
        <Button
          aria-expanded="false"
          className="inline-flex"
          size="lg"
          type="button"
          variant="secondary"
        >
          {messages.nav.downloadCV}
          <DownloadIcon className="size-4" />
        </Button>
        <div className="pointer-events-none absolute top-full right-0 z-50 w-64 pt-2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
          <div className="rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-xl">
            {panelContent}
          </div>
        </div>
      </div>
      <details className={cn("relative sm:hidden", className)}>
        <summary className="list-none">
          <Button asChild size="lg" variant="secondary">
            <span>
              {messages.nav.downloadCV}
              <DownloadIcon className="size-4" />
            </span>
          </Button>
        </summary>
        <div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-xl">
          {panelContent}
        </div>
      </details>
    </>
  );
}
