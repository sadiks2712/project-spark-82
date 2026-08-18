import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Buildbrief — Product Studio for Web, Apps & AI" },
      {
        name: "description",
        content:
          "Buildbrief is a small senior product studio building websites, mobile apps, AI automations and custom software for founders and growing businesses.",
      },
      { property: "og:title", content: "About Buildbrief — Product Studio for Web, Apps & AI" },
      {
        property: "og:description",
        content:
          "A senior product studio shipping websites, mobile apps, AI automation and custom software.",
      },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { value: "60+", label: "Projects delivered" },
  { value: "4", label: "Core practices" },
  { value: "24h", label: "Requirement response" },
  { value: "100%", label: "Senior-built" },
];

function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-semibold tracking-widest text-primary uppercase">About us</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
        We turn rough ideas into <span className="text-gradient-brand">shipped products</span>.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Buildbrief is a compact product studio. We work across four practices — web
        development, mobile app development, AI &amp; automation, and custom software —
        with the same people from first call to launch. No account managers, no handoffs
        between agencies, no bloated process.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label} className="rounded-2xl p-5 shadow-soft">
            <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold">How we work</h2>
      <div className="mt-6 space-y-5 text-muted-foreground">
        <p>
          Every engagement starts with a structured requirement. That is exactly why this
          site exists: instead of a long discovery call, you fill a guided brief and we
          arrive at the first conversation already understanding your scope, budget and
          deadline.
        </p>
        <p>
          We then reply with a scope, an approach and a realistic estimate. If it fits, we
          build in short milestones with working demos — not status reports.
        </p>
        <p>
          We keep our own stack deliberately lightweight and we build yours the same way:
          only the complexity your product actually needs.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild size="lg" className="rounded-full">
          <Link to="/request">Start Your Project</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
