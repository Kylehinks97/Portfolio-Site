import { notFound } from "next/navigation";
import { HomeView } from "@/components/site/home-view";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return <HomeView locale={locale} messages={messages.home} />;
}
