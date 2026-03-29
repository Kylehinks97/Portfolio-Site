import { notFound } from "next/navigation";
import { ProjectsGrid } from "@/components/site/projects-grid";
import { Reveal } from "@/components/site/reveal";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { envConfig } from "@/envConfig";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);
  const apiBaseUrl = envConfig.symfonyApiBaseUrl;

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
      <Reveal className="mb-12 max-w-3xl space-y-4">
        <p className="text-xs font-semibold tracking-[0.28em] uppercase text-primary">
          {messages.nav.projects}
        </p>
        <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
          {messages.projects.title}
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          {messages.projects.description}
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <ProjectsGrid
          apiBaseUrl={apiBaseUrl}
          locale={locale}
          messages={messages.projects}
        />
      </Reveal>
    </main>
  );
}
