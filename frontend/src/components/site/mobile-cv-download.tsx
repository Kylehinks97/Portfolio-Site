"use client";

import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

type MobileCvDownloadProps = {
  locale: Locale;
  messages: Messages;
};

const cvFileByLanguage: Record<Locale, string> = {
  en: "/CV/Kyle_Hinks_CV_english.pdf",
  es: "/CV/Kyle_Hinks_CV_espa%C3%B1ol.pdf",
};

export function MobileCvDownload({ locale, messages }: MobileCvDownloadProps) {
  const [selectedCvLanguage, setSelectedCvLanguage] = useState<Locale>(
    locale === "es" ? "es" : "en",
  );

  const languageOptions: Array<{ value: Locale; label: string }> = [
    { value: "en", label: messages.nav.cvEnglishOption },
    { value: "es", label: messages.nav.cvSpanishOption },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
      <p className="mb-3 text-sm font-medium text-foreground">
        {messages.nav.downloadCV}
      </p>
      <div
        aria-label={messages.nav.cvLanguagePrompt}
        className="grid grid-cols-2 gap-2"
        role="radiogroup"
      >
        {languageOptions.map((option) => {
          const isSelected = selectedCvLanguage === option.value;

          return (
            <label
              key={option.value}
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
                name="mobile-cv-language"
                onChange={() => setSelectedCvLanguage(option.value)}
                type="radio"
                value={option.value}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      <Button asChild className="mt-3 w-full py-6">
        <a download href={cvFileByLanguage[selectedCvLanguage]}>
          {messages.nav.cvDownloadButton}
          <DownloadIcon className="size-4" />
        </a>
      </Button>
    </div>
  );
}
