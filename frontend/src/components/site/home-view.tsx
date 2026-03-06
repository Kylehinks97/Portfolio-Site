"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import {LogoMarquee} from "@/components/site/logo-marquee";

type HomeViewProps = {
  locale: Locale;
  messages: Messages["home"];
};

const featureIcons = [Sparkles, Zap, Star];

export function HomeView({ locale, messages }: HomeViewProps) {
  return (
    <main className="relative overflow-hidden">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <div className="mesh-overlay absolute inset-0 opacity-50" />
          <div className="animate-glow absolute left-[8%] top-24 size-48 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="animate-float-slow absolute right-[12%] top-48 size-64 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="animate-float-delay absolute bottom-12 left-1/2 size-56 -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" />
        </div>

        <div className="mx-auto flex min-h-[calc(100vh-81px)] w-full max-w-7xl flex-col justify-center gap-16 px-6 py-20 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Badge variant="accent">{messages.availability}</Badge>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.8 }}
              >
                <p className="text-sm tracking-[0.28em] text-muted-foreground uppercase">
                  {messages.eyebrow}
                </p>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                  <span className="text-gradient">{messages.title}</span>
                </h1>
                {messages.description.map((desc) => (
                    <p
                        key={desc}
                        className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl"
                    >
                      {desc}
                    </p>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Button asChild size="lg">
                  <Link href={`/${locale}/projects`}>
                    {messages.primaryCta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href={`/${locale}/contact`}>
                    {messages.secondaryCta}
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.9 }}
            >
              <Card className="relative overflow-hidden border-white/12 p-8">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="grid gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <p className="text-sm tracking-[0.24em] text-muted-foreground uppercase">
                        {messages.visualEyebrow}
                      </p>
                      <p className="max-w-xs text-2xl font-semibold">
                        {messages.visualTitle}
                      </p>
                    </div>
                    <div className="animate-float-slow rounded-full border border-white/12 bg-white/8 p-4">
                      <Sparkles className="size-7 text-sky-200" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {messages.stats.map((item) => (
                      <motion.div
                        key={item.label}
                        className="rounded-[24px] border border-white/10 bg-white/6 p-5"
                        transition={{
                          type: "spring",
                          stiffness: 240,
                          damping: 18,
                        }}
                        whileHover={{ y: -6 }}
                      >
                        <div className="text-3xl font-semibold text-foreground">
                          {item.value}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.label}
                        </p>
                      </motion.div>
                    ))}
                    <motion.div
                      className="rounded-[24px] border border-fuchsia-300/20 bg-fuchsia-300/10 p-5 sm:col-span-2"
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 18,
                      }}
                      whileHover={{ y: -6 }}
                    >
                      <p className="text-sm tracking-[0.2em] text-fuchsia-100 uppercase">
                        {messages.principleEyebrow}
                      </p>
                      <p className="mt-3 text-lg text-fuchsia-50">
                        {messages.principleText}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <LogoMarquee />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">
        <Reveal className="space-y-4">
          <Badge>{messages.featureTitle}</Badge>
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {messages.featureTitle}
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              {messages.featureDescription}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {messages.features.map((feature, index) => {
            const Icon = featureIcons[index];

            return (
              <Reveal key={feature.title} delay={index * 0.08}>
                <motion.div whileHover={{ y: -8 }}>
                  <Card className="h-full border-white/10">
                    <CardHeader>
                      <div className="mb-2 flex size-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8">
                        <Icon className="size-5 text-sky-200" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <Reveal className="max-w-3xl space-y-3">
          <Badge>{messages.processTitle}</Badge>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {messages.processTitle}
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            {messages.processDescription}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {messages.process.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.08}>
              <motion.div whileHover={{ y: -8 }}>
                <Card className="h-full border-white/10">
                  <CardHeader>
                    <p className="text-sm tracking-[0.22em] text-fuchsia-200 uppercase">
                      {item.step}
                    </p>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
        <Reveal>
          <Card className="relative overflow-hidden border-white/12 px-6 py-8 sm:px-10 sm:py-10">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-sky-400/10 to-transparent blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {messages.closingTitle}
                </h2>
                <p className="text-lg leading-8 text-muted-foreground">
                  {messages.closingDescription}
                </p>
              </div>
              <Button asChild size="lg">
                <Link href={`/${locale}/contact`}>
                  {messages.closingCta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </main>
  );
}
