import { Mail, MessageSquareMore } from "lucide-react";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-primary">
              {messages.nav.contact}
            </p>
            <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
              {messages.contact.title}
            </h1>
            <p className="max-w-md text-base leading-7 text-muted-foreground">
              {messages.contact.description}
            </p>
          </div>

          <div className="space-y-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-md border border-border bg-secondary">
                  <MessageSquareMore className="size-4 text-primary" />
                </div>
                <CardTitle>{messages.contact.availabilityTitle}</CardTitle>
                <CardDescription>
                  {messages.contact.availabilityDescription}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-md border border-border bg-secondary">
                  <Mail className="size-4 text-primary" />
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
