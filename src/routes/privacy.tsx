import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Buildbrief" },
      {
        name: "description",
        content:
          "How Buildbrief collects, uses and stores the project requirement information you submit, including email delivery and CSV record keeping.",
      },
      { property: "og:title", content: "Privacy Policy — Buildbrief" },
      {
        property: "og:description",
        content: "How we handle the project information you share with us.",
      },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "Information we collect",
    body: [
      "When you submit a project requirement we collect the details you enter: your name, company name, email address, phone or WhatsApp number, country, preferred contact method, and everything you tell us about the project itself — scope, features, budget, timeline and any reference links or file names.",
      "We do not use tracking pixels, advertising cookies or third-party analytics profiling on this site.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "Your requirement is used for one purpose: to understand, scope and respond to your project enquiry. We do not sell, rent or share it with advertisers.",
      "We send two emails per submission — a notification to our team and a confirmation to you — using EmailJS as the delivery provider.",
    ],
  },
  {
    title: "How it is stored",
    body: [
      "Submissions are appended to a CSV project record. There is no customer database, no account system and no login on this website.",
      "Access to the requirement record is limited to our team.",
    ],
  },
  {
    title: "Files you upload",
    body: [
      "Attachments you select are validated and previewed in your browser. Only file names are included in the requirement record and emails; we will ask you to send the files directly when we follow up.",
    ],
  },
  {
    title: "Retention and your rights",
    body: [
      "We keep requirement records for as long as needed to evaluate and deliver the work, plus a reasonable business record period.",
      "You may ask us to correct or delete your requirement at any time by emailing us with your Requirement ID.",
    ],
  },
  {
    title: "Contact",
    body: ["Questions about this policy? Email hello@buildbrief.dev."],
  },
];

function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: August 2026</p>
      <div className="mt-10 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-xl font-bold">{s.title}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
