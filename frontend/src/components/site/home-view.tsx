"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Code2, Layers } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { LogoMarquee } from "@/components/site/logo-marquee";

type HomeViewProps = {
  locale: Locale;
  messages: Messages["home"];
};

const featureIcons = [Layers, Code2, BookOpen];

export function HomeView({ locale, messages }: HomeViewProps) {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid items-start gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left — copy */}
          <div className="space-y-10">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-primary" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-primary">
                  {messages.availability}
                </span>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">
                  {messages.eyebrow}
                </p>
                <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
                  {messages.title}
                </h1>
              </div>

              {messages.description.map((desc) => (
                <p
                  key={desc}
                  className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
                >
                  {desc}
                </p>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
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

          {/* Right — stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                  {messages.visualEyebrow}
                </p>
                <CardTitle className="text-lg font-semibold">
                  {messages.visualTitle}
                </CardTitle>
              </CardHeader>

              <div className="grid grid-cols-2 gap-px bg-border mx-6 rounded-md overflow-hidden mb-6">
                {messages.stats.map((item) => (
                  <div
                    key={item.label}
                    className="bg-card px-4 py-4"
                  >
                    <div className="text-2xl font-bold text-foreground tabular-nums">
                      {item.value}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-5">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border mx-6 mb-6 pt-4">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5">
                  {messages.principleEyebrow}
                </p>
                <p className="text-sm text-muted-foreground leading-6">
                  {messages.principleText}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── Divider + Marquee ─────────────────────── */}
      <div className="border-t border-border" />
      <LogoMarquee />
      <div className="border-b border-border" />

      {/* ── Skills ───────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <Reveal className="mb-10 space-y-3">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-primary">
            01
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
            {messages.featureTitle}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {messages.featureDescription}
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {messages.features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <Reveal key={feature.title} delay={index * 0.07}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-3 flex size-10 items-center justify-center rounded-md border border-border bg-secondary">
                        <Icon className="size-4 text-primary" />
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

      {/* ── Languages / Process ──────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
          <Reveal className="mb-10 space-y-3">
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-primary">
              02
            </p>
            <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
              {messages.processTitle}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              {messages.processDescription}
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {messages.process.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.07}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Card className="h-full">
                    <CardHeader>
                      <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary">
                        {item.step}
                      </p>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA — dark inversion block ───── */}
      <Reveal>
        <section className="dark-section">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
            <div className="space-y-3">
              <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
                {messages.closingTitle}
              </h2>
              <p className="max-w-xl text-base leading-7 opacity-60">
                {messages.closingDescription}
              </p>
            </div>
            <div className="shrink-0">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href={`/${locale}/contact`}>
                  {messages.closingCta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
