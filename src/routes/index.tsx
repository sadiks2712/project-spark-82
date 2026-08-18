import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Globe,
  Smartphone,
  Bot,
  Boxes,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PROJECT_TYPES } from "@/lib/requirement";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SoftWare Hub — Tell Us What You Want to Build" },
      {
        name: "description",
        content:
          "Share your idea, requirements, features, budget and timeline. We build websites, mobile apps, AI automation and custom software — and reply with real scope in one business day.",
      },
      { property: "og:title", content: "SoftWare Hub — Tell Us What You Want to Build" },
      {
        property: "og:description",
        content:
          "A guided project brief for websites, mobile apps, AI automation and custom software.",
      },
    ],
  }),
  component: Index,
});

const ICONS = { website: Globe, mobile: Smartphone, automation: Bot, software: Boxes } as const;

const STEPS = [
  { n: "01", title: "Tell Us Your Idea", text: "Pick what you want to build and describe it in your own words." },
  { n: "02", title: "Share Your Requirements", text: "Answer smart questions about features, design, budget and timeline." },
  { n: "03", title: "We Review Your Request", text: "We study the brief and prepare scope, approach and a realistic estimate." },
  { n: "04", title: "We Contact You", text: "You hear from us on your preferred channel within one business day." },
];

const WHY = [
  { icon: Zap, title: "Fast, structured start", text: "No discovery marathon — your brief becomes a scope in hours, not weeks." },
  { icon: Users, title: "Senior team, no handoffs", text: "The people who scope your project are the people who build it." },
  { icon: ShieldCheck, title: "Clear, honest pricing", text: "Realistic estimates against the scope you described, not padded ranges." },
  { icon: Gauge, title: "Built to ship", text: "Short milestones with working demos instead of status reports." },
];

const FAQ = [
  { q: "How long does the brief take?", a: "About five minutes. Seven short steps, and your answers are saved as you go so you can edit anything before submitting." },
  { q: "What happens after I submit?", a: "You get a unique Requirement ID and a confirmation email immediately. We review the brief and respond with scope, approach and an estimate — usually within one business day." },
  { q: "I don't know my budget yet. Can I still submit?", a: "Yes. Choose 'I'm Not Sure' and we'll suggest options at different price points based on what you described." },
  { q: "Do I need to know the technical details?", a: "No. Answer in plain language, and use the 'Help Me Describe My Idea' assistant if you want a structured draft you can edit." },
  { q: "Is my information kept private?", a: "Yes. Your brief is used only to scope and respond to your enquiry. We're happy to sign an NDA on request." },
];

const HERO_SERVICES = [
  { icon: Globe, label: "Websites" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Bot, label: "AI Solutions" },
  { icon: Zap, label: "Automation" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section relative min-h-[600px] lg:min-h-[700px] overflow-hidden bg-[#fafafa] dark:bg-background pt-2 pb-16 lg:pt-4 lg:pb-20">
        {/* Full Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right_-160px] sm:bg-[center_right_-80px] md:bg-right lg:bg-[center_right]"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
          aria-hidden
        />

        {/* Light & Dark Mode Readability Overlays */}
        <div 
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fafafa]/95 via-[#fafafa]/80 to-transparent md:from-[#fafafa]/90 md:via-[#fafafa]/40 md:to-transparent dark:from-background/95 dark:via-background/70 dark:to-transparent" 
          aria-hidden 
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-xl lg:max-w-2xl py-1 sm:py-2">
            {/* Pill Badge */}
            <div className="hero-fade-in inline-block" style={{ animationDelay: "0.05s" }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md dark:border-border dark:bg-card/90 dark:text-muted-foreground">
                <span className="size-2 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" />
                We build. You dream.
              </span>
            </div>

            {/* Editorial Headline with Serif & Blue Swoosh Underline */}
            <div className="hero-fade-in mt-4 sm:mt-5" style={{ animationDelay: "0.15s" }}>
              <h1 className="font-hero-serif text-5xl font-bold tracking-tight text-slate-900 dark:text-foreground sm:text-6xl lg:text-[70px] leading-[1.06]">
                Have an Idea?
                <br />
                Let&apos;s{" "}
                <span className="relative inline-block text-blue-600 dark:text-blue-400">
                  Build
                  {/* Hand-drawn blue underline brush stroke */}
                  <svg
                    className="absolute -bottom-2.5 left-0 w-[108%] text-blue-600 dark:text-blue-400 pointer-events-none"
                    viewBox="0 0 160 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 13.5C35 4.5 110 3.5 156 10C125 14.5 60 17 20 15.5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                It.
              </h1>
            </div>

            {/* Subheading */}
            <div className="hero-fade-in mt-6" style={{ animationDelay: "0.25s" }}>
              <p className="max-w-xl text-[16px] leading-relaxed text-slate-600 dark:text-muted-foreground sm:text-[17px]">
                Share your requirements and we&apos;ll create custom websites, mobile apps,
                AI solutions and automation that elevate your business.
              </p>
            </div>

            {/* Service Pills Bar with Dividers */}
            <div className="hero-fade-in mt-8" style={{ animationDelay: "0.35s" }}>
              <div className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-sm backdrop-blur-md dark:border-border/70 dark:bg-card/80 sm:gap-2">
                {/* Websites */}
                <div className="flex items-center gap-2 px-2.5 py-1">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                    <Globe className="size-4" />
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-foreground sm:text-sm">Websites</span>
                </div>

                <span className="hidden h-5 w-px bg-slate-200 dark:bg-border sm:block" aria-hidden />

                {/* Mobile Apps */}
                <div className="flex items-center gap-2 px-2.5 py-1">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                    <Smartphone className="size-4" />
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-foreground sm:text-sm">Mobile Apps</span>
                </div>

                <span className="hidden h-5 w-px bg-slate-200 dark:bg-border sm:block" aria-hidden />

                {/* AI Solutions */}
                <div className="flex items-center gap-2 px-2.5 py-1">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                    <Bot className="size-4" />
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-foreground sm:text-sm">AI Solutions</span>
                </div>

                <span className="hidden h-5 w-px bg-slate-200 dark:bg-border sm:block" aria-hidden />

                {/* Automation */}
                <div className="flex items-center gap-2 px-2.5 py-1">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                    <Zap className="size-4" />
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-foreground sm:text-sm">Automation</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-fade-in mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.45s" }}>
              <Button
                asChild
                size="lg"
                className="h-13 rounded-full bg-slate-950 px-8 text-base font-semibold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-slate-900 dark:bg-foreground dark:text-background"
              >
                <Link to="/request" className="flex items-center gap-2.5">
                  Start Your Project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-full border-slate-200 bg-white/90 px-7 text-base font-semibold text-slate-900 shadow-sm backdrop-blur-sm transition-transform hover:scale-[1.02] hover:bg-slate-50 dark:border-border/80 dark:bg-card/80 dark:text-foreground"
              >
                <Link to="/" hash="how-it-works" className="flex items-center gap-2.5">
                  <span className="flex size-6 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-foreground dark:text-background">
                    <svg viewBox="0 0 24 24" className="size-3 fill-current">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </span>
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Trust Section / Social Proof */}
            <div className="hero-fade-in mt-12 flex items-center gap-4" style={{ animationDelay: "0.55s" }}>
              {/* 4 Overlapping Avatar Photos */}
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Client avatar"
                  className="size-11 rounded-full border-2 border-white object-cover shadow-sm dark:border-background"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Client avatar"
                  className="size-11 rounded-full border-2 border-white object-cover shadow-sm dark:border-background"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Client avatar"
                  className="size-11 rounded-full border-2 border-white object-cover shadow-sm dark:border-background"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Client avatar"
                  className="size-11 rounded-full border-2 border-white object-cover shadow-sm dark:border-background"
                />
              </div>

              <p className="text-sm leading-snug text-slate-600 dark:text-muted-foreground">
                <span className="font-bold text-slate-900 dark:text-foreground">Trusted by businesses</span> across India
                <br />
                to turn ideas into real results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Project types */}
      <section id="services" className="scroll-mt-20 border-t border-border bg-surface/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            What we build
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Four practices, one team, one brief
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PROJECT_TYPES.map((t) => {
              const Icon = ICONS[t.value];
              return (
                <Card
                  key={t.value}
                  className="card-interactive rounded-2xl border-border p-7 shadow-soft"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-accent text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{t.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{t.description}</p>
                  <Button asChild variant="ghost" className="mt-5 rounded-full px-3">
                    <Link to="/request">
                      Select <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            How it works
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            From idea to a scoped project in four steps
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="font-display text-3xl font-bold text-primary/25">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us / portfolio anchor */}
      <section id="portfolio" className="scroll-mt-20 border-t border-border bg-surface/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            Why choose us
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Built by a team that ships
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {WHY.map((w) => {
              const Icon = w.icon;
              return (
                <Card key={w.title} className="rounded-2xl border-border p-7 shadow-soft">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-muted-foreground">{w.text}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <h2 className="text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-surface/50">
        <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to start?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Five minutes now saves weeks later. Submit your brief and get a Requirement ID
            instantly.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full px-8">
            <Link to="/request">
              Start Your Project
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
