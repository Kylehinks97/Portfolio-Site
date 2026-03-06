import { Layers3, Rocket } from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
      <Reveal className="max-w-3xl space-y-4">
        <Badge>{messages.nav.aboutMe}</Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {messages.aboutMe.title}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          {messages.aboutMe.description}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal delay={0.06}>
          <Card className="min-h-72 border-white/10">
            <CardHeader>
              <div className="mb-3 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                <Layers3 className="size-5 text-sky-200" />
              </div>
              <CardTitle>{messages.projects.placeholderTitle}</CardTitle>
              <CardDescription>
                {messages.projects.placeholderDescription}
              </CardDescription>
            </CardHeader>
          </Card>
        </Reveal>

        <Reveal delay={0.12}>
          <Card className="min-h-72 border-white/10">
            <CardHeader>
              <div className="mb-3 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                <Rocket className="size-5 text-fuchsia-200" />
              </div>
              <CardTitle>{messages.projects.caseStudiesTitle}</CardTitle>
              <CardDescription>
                {messages.projects.caseStudiesDescription}
              </CardDescription>
            </CardHeader>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
