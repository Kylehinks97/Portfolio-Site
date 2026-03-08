import { Mail, MessageSquareMore } from "lucide-react";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/site/contact-form";
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

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="space-y-6">
          <Badge className="badge-liquid liquid">{messages.nav.contact}</Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {messages.contact.title}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              {messages.contact.description}
            </p>
          </div>

          <div className="grid gap-4">
            <Card className="border-white/10 card-shiny">
              <CardHeader>
                <div className="mb-2 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                  <MessageSquareMore className="size-5 text-sky-200" />
                </div>
                <CardTitle>{messages.contact.availabilityTitle}</CardTitle>
                <CardDescription>
                  {messages.contact.availabilityDescription}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-white/10 card-shiny">
              <CardHeader>
                <div className="mb-2 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                  <Mail className="size-5 text-fuchsia-200" />
                </div>
                <CardTitle>{messages.contact.responseTitle}</CardTitle>
                <CardDescription>
                  {messages.contact.responseDescription}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm messages={messages.contact.form} />
        </Reveal>
      </div>
    </main>
  );
}
