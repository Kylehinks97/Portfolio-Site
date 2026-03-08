"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Messages } from "@/i18n/messages";
import {
  type ContactFormValues,
  contactFormSchema,
} from "@/lib/validation/contact";

type ContactFormProps = {
  messages: Messages["contact"]["form"];
};

export function ContactForm({ messages }: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    setServerMessage(null);

    startTransition(async () => {
      const result = await submitContactForm(values);

      if (result.success) {
        form.reset();
        setServerMessage({ kind: "success", text: messages.success });
        return;
      }

      Object.entries(result.fieldErrors ?? {}).forEach(([field, errors]) => {
        if (!errors?.[0]) {
          return;
        }

        form.setError(field as keyof ContactFormValues, {
          message: errors[0],
        });
      });

      setServerMessage({
        kind: "error",
        text: result.message ?? messages.error,
      });
    });
  };

  return (
    <Card className="border-white/10">
      <CardHeader>
        <CardTitle>{messages.submit}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                {messages.name}
              </label>
              <Input
                id="name"
                placeholder={messages.placeholders.name}
                {...form.register("name")}
              />
              {form.formState.errors.name ? (
                <p className="text-sm text-rose-300">
                  {form.formState.errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                {messages.email}
              </label>
              <Input
                id="email"
                placeholder={messages.placeholders.yourEmail}
                type="email"
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <p className="text-sm text-rose-300">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="company">
              {messages.company}
            </label>
            <Input
              id="company"
              placeholder={messages.placeholders.company}
              {...form.register("company")}
            />
            {form.formState.errors.company ? (
              <p className="text-sm text-rose-300">
                {form.formState.errors.company.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="message">
              {messages.message}
            </label>
            <Textarea
              id="message"
              placeholder={messages.placeholders.message}
              {...form.register("message")}
            />
            {form.formState.errors.message ? (
              <p className="text-sm text-rose-300">
                {form.formState.errors.message.message}
              </p>
            ) : null}
          </div>

          {serverMessage ? (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                serverMessage.kind === "success"
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                  : "border-rose-400/20 bg-rose-400/10 text-rose-100"
              }`}
            >
              {serverMessage.text}
            </div>
          ) : null}

          <Button
            className="w-full sm:w-auto text-white"
            disabled={isPending}
            type="submit"
          >
            {isPending ? messages.sending : messages.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
