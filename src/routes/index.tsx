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
  Sparkles,
  Code2,
  Rocket,
  CheckCircle2,
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

const HERO_STATS = [
  { value: "60+", label: "Projects Delivered" },
  { value: "24h", label: "Response Time" },
  { value: "100%", label: "Senior Engineers" },
  { value: "4.9★", label: "Client Rating" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-32 lg:py-40">
          <div className="text-center">
            {/* Animated badge */}
            <div className="hero-fade-in" style={{ animationDelay: "0s" }}>
              <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-5 py-2 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur-sm">
                <span className="hero-pulse-dot size-2 rounded-full bg-success" />
                Accepting new projects — reply within 1 business day
                <Sparkles className="size-3.5 text-primary" />
              </span>
            </div>

            {/* Main heading with stagger */}
            <div className="hero-fade-in" style={{ animationDelay: "0.15s" }}>
              <h1 className="mx-auto mt-10 max-w-4xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl md:text-7xl">
                We Build{" "}
                <span className="hero-gradient-text">Digital Products</span>
                <br className="hidden sm:block" />
                {" "}That Drive Growth.
              </h1>
            </div>

            {/* Subtitle */}
            <div className="hero-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Share your idea, requirements, budget and timeline. We design and engineer
                websites, mobile apps, AI automations and custom software —{" "}
                <span className="font-medium text-foreground">scoped in hours, not weeks.</span>
              </p>
            </div>

            {/* CTA buttons */}
            <div className="hero-fade-in" style={{ animationDelay: "0.45s" }}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="hero-cta-primary group rounded-full px-8 text-base shadow-glow">
                  <Link to="/request">
                    Start Your Project
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-base backdrop-blur-sm">
                  <Link to="/" hash="how-it-works">
                    <Code2 className="size-4" />
                    How It Works
                  </Link>
                </Button>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="hero-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center">
                    <span className="font-display text-2xl font-bold text-gradient-brand sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating feature chips */}
            <div className="hero-fade-in" style={{ animationDelay: "0.75s" }}>
              <div className="mt-12 flex flex-wrap justify-center gap-3">
                {[
                  { icon: Globe, label: "Web Apps" },
                  { icon: Smartphone, label: "Mobile Apps" },
                  { icon: Bot, label: "AI Automation" },
                  { icon: Boxes, label: "Custom Software" },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="hero-chip inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:text-foreground hover:shadow-soft"
                  >
                    <chip.icon className="size-4 text-primary" />
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" aria-hidden />
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
