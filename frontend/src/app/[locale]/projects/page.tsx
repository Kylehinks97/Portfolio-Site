import { notFound } from "next/navigation";
import { ProjectsGrid } from "@/components/site/projects-grid";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
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
      <Reveal className="max-w-3xl space-y-4">
        <Badge className="badge-liquid liquid">{messages.nav.projects}</Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {messages.projects.title}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
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
