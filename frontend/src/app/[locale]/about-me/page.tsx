import { Ban, Heart } from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

type AboutMePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutMePage({ params }: AboutMePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
      <Reveal className="mb-12 max-w-3xl space-y-4">
        <p className="text-xs font-semibold tracking-[0.28em] uppercase text-primary">
          {messages.nav.aboutMe}
        </p>
        <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
          {messages.aboutMe.title}
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          {messages.aboutMe.description}
        </p>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal delay={0.06}>
          <Card className="likes-card min-h-64">
            <CardHeader>
              <div className="likes-icon mb-3 flex size-10 items-center justify-center rounded-md border border-border bg-secondary transition-colors duration-200">
                <Heart className="size-4 text-muted-foreground" />
              </div>
              <CardTitle>{messages.aboutMe.likesTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {messages.aboutMe.like.map((item) => (
                  <Badge
                    key={item}
                    className="likes-badge normal-case tracking-normal"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.12}>
          <Card className="dislikes-card min-h-64">
            <CardHeader>
              <div className="dislikes-icon mb-3 flex size-10 items-center justify-center rounded-md border border-border bg-secondary">
                <Ban className="size-4 text-muted-foreground" />
              </div>
              <CardTitle>{messages.aboutMe.dislikesTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {messages.aboutMe.dislike.map((item) => (
                  <Badge
                    key={item}
                    className="dislikes-badge normal-case tracking-normal"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
