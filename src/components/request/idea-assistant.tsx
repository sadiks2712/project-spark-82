import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProjectType } from "@/lib/requirement";

/**
 * Requirement assistant. It expands a one-line idea into a structured draft
 * (objective, users, features, modules, integrations, open questions) that the
 * customer can edit before inserting. Nothing is ever submitted automatically.
 */
type Draft = {
  objective: string;
  users: string;
  features: string[];
  modules: string[];
  integrations: string[];
  questions: string[];
};

const KEYWORDS: { match: RegExp; features: string[]; integrations: string[] }[] = [
  {
    match: /shop|store|ecommerce|e-commerce|sell|product|order/i,
    features: ["Product catalogue", "Cart & checkout", "Payment gateway", "Order tracking"],
    integrations: ["Payment gateway (Razorpay/Stripe)", "Shipping / delivery partner"],
  },
  {
    match: /book|appointment|schedul|slot|reserv/i,
    features: ["Availability calendar", "Booking flow", "Reminders", "Reschedule & cancel"],
    integrations: ["Google Calendar", "SMS / WhatsApp reminders"],
  },
  {
    match: /chat|support|whatsapp|bot|agent/i,
    features: ["Conversational assistant", "Message history", "Human handover"],
    integrations: ["WhatsApp Business API", "Knowledge base"],
  },
  {
    match: /learn|course|student|school|educat|farmer|training/i,
    features: ["Content library", "Progress tracking", "Multi-language support"],
    integrations: ["Video hosting", "Notifications"],
  },
  {
    match: /deliver|driver|track|location|gps|map|ride/i,
    features: ["Live location tracking", "Maps", "Route history"],
    integrations: ["Google Maps", "Push notifications"],
  },
  {
    match: /invoice|billing|account|finance|report|inventory|stock/i,
    features: ["Records management", "Reports & exports", "Role-based access"],
    integrations: ["Accounting export (Excel / Sheets)"],
  },
];

const BASE_BY_TYPE: Record<ProjectType, { features: string[]; modules: string[] }> = {
  website: {
    features: ["Responsive marketing pages", "Contact form", "SEO basics", "Analytics"],
    modules: ["Home", "About", "Services", "Contact"],
  },
  mobile: {
    features: ["Onboarding & login", "User profiles", "Push notifications"],
    modules: ["Auth", "Home feed", "Profile", "Settings"],
  },
  automation: {
    features: ["Trigger-based workflow", "Automatic replies", "Activity log"],
    modules: ["Triggers", "Actions", "Logs & monitoring"],
  },
  software: {
    features: ["Admin dashboard", "User management", "Reports", "Role-based access"],
    modules: ["Dashboard", "Records", "Users & roles", "Reports"],
  },
};

function buildDraft(idea: string, type: ProjectType): Draft {
  const base = BASE_BY_TYPE[type];
  const features = new Set(base.features);
  const integrations = new Set<string>();

  for (const k of KEYWORDS) {
    if (k.match.test(idea)) {
      k.features.forEach((f) => features.add(f));
      k.integrations.forEach((i) => integrations.add(i));
    }
  }

  const subject = idea.trim().replace(/^(i want|i need|build|make)\s+(an?|the)?\s*/i, "");

  return {
    objective: `Build ${subject || "the product described"} as a ${
      type === "mobile" ? "mobile application" : type === "automation" ? "automated workflow" : type === "software" ? "custom software platform" : "website"
    } that is simple to use and quick to launch.`,
    users: /farmer|student|patient|customer|driver|seller|teacher|employee/i.exec(idea)?.[0]
      ? `Primary users: ${/farmer|student|patient|customer|driver|seller|teacher|employee/i.exec(idea)![0]}s. Secondary users: internal team managing content and requests.`
      : "Primary users: your customers. Secondary users: your internal team managing content, requests and reports.",
    features: [...features],
    modules: base.modules,
    integrations: [...integrations],
    questions: [
      "Which single outcome matters most in version 1?",
      "Do users need accounts, or can they use it anonymously?",
      "Is there an existing system or data that must be migrated?",
      "What is the hard deadline, if any?",
    ],
  };
}

function draftToText(d: Draft): string {
  return [
    `Objective: ${d.objective}`,
    ``,
    `Target users: ${d.users}`,
    ``,
    `Key features:`,
    ...d.features.map((f) => `- ${f}`),
    ``,
    `Modules:`,
    ...d.modules.map((m) => `- ${m}`),
    ...(d.integrations.length
      ? [``, `Integrations:`, ...d.integrations.map((i) => `- ${i}`)]
      : []),
    ``,
    `Open questions to decide:`,
    ...d.questions.map((q) => `- ${q}`),
  ].join("\n");
}

export function IdeaAssistant({
  projectType,
  onInsert,
}: {
  projectType: ProjectType;
  onInsert: (text: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [idea, setIdea] = useState("");
  const [draft, setDraft] = useState("");

  const generate = () => setDraft(draftToText(buildDraft(idea, projectType)));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="rounded-full">
          <Sparkles className="size-4" />
          Help Me Describe My Idea
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Describe your idea in one line</DialogTitle>
          <DialogDescription>
            We&apos;ll expand it into a structured draft — objective, users, features, modules
            and open questions. Edit anything before inserting it; nothing is submitted
            automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            rows={2}
            maxLength={300}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. I want an app for farmers"
            className="rounded-xl"
          />
          <Button
            type="button"
            onClick={generate}
            disabled={idea.trim().length < 4}
            className="rounded-full"
          >
            <Wand2 className="size-4" />
            Generate draft
          </Button>

          {draft && (
            <Textarea
              rows={16}
              maxLength={3000}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="rounded-xl font-mono text-xs leading-relaxed"
            />
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!draft.trim()}
            onClick={() => {
              onInsert(draft.trim());
              setOpen(false);
            }}
          >
            Insert into description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
