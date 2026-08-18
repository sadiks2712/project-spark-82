import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SoftWare Hub — Talk About Your Project" },
      {
        name: "description",
        content:
          "Reach SoftWare Hub by email, WhatsApp or phone, or submit a structured project requirement and get a scoped reply within one business day.",
      },
      { property: "og:title", content: "Contact SoftWare Hub — Talk About Your Project" },
      {
        property: "og:description",
        content: "Email, WhatsApp or send a structured project brief. Reply within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "armanmulani313@gmail.com",
    href: "mailto:armanmulani313@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 81779 00698",
    href: "https://wa.me/918177900698",
  },
  { icon: Phone, label: "Phone", value: "+91 84597 52992", href: "tel:+918459752992" },
  { icon: Clock, label: "Response time", value: "Within 1 business day", href: null },
];

function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-semibold tracking-widest text-primary uppercase">Contact</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Let&apos;s talk about your project</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        The fastest route is the project brief — it gives us everything we need to reply with
        real scope and pricing. Prefer to talk first? Use any channel below.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          const inner = (
            <Card className="card-interactive h-full rounded-2xl border-border p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary">
                <Icon className="size-5" />
              </span>
              <div className="mt-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {c.label}
              </div>
              <div className="mt-1 font-medium">{c.value}</div>
            </Card>
          );
          return c.href ? (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer">
              {inner}
            </a>
          ) : (
            <div key={c.label}>{inner}</div>
          );
        })}
      </div>

      <Card className="mt-10 rounded-2xl border-primary/30 bg-accent/40 p-8 shadow-soft">
        <h2 className="text-xl font-bold">Send a structured brief instead</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Seven short steps, roughly five minutes. You get a Requirement ID and a confirmation
          email immediately.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full">
          <Link to="/request">Start Your Project</Link>
        </Button>
      </Card>
    </div>
  );
}
