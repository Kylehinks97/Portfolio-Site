import { Ban, Heart } from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
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
                <Heart className="size-5 text-emerald-200" />
              </div>
              <CardTitle>{messages.aboutMe.likesTitle}</CardTitle>
              <CardDescription />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {messages.aboutMe.like.map((item) => (
                  <Badge
                    key={item}
                    className="border-emerald-300/25 bg-emerald-300/10 text-emerald-50 normal-case tracking-normal"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.12}>
          <Card className="min-h-72 border-white/10">
            <CardHeader>
              <div className="mb-3 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                <Ban className="size-5 text-rose-200" />
              </div>
              <CardTitle>{messages.aboutMe.dislikesTitle}</CardTitle>
              <CardDescription />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {messages.aboutMe.dislike.map((item) => (
                  <Badge
                    key={item}
                    className="border-rose-300/25 bg-rose-300/10 text-rose-50 normal-case tracking-normal"
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
