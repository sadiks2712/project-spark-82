import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — SoftWare Hub" },
      {
        name: "description",
        content:
          "The terms that apply when you submit a project requirement to SoftWare Hub, including estimates, confidentiality and intellectual property.",
      },
      { property: "og:title", content: "Terms & Conditions — SoftWare Hub" },
      {
        property: "og:description",
        content: "Terms that apply when you submit a project requirement to SoftWare Hub.",
      },
    ],
  }),
  component: TermsPage,
});

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. Submitting a requirement",
    body: [
      "Submitting a project requirement through this website is a request for a proposal. It does not create a contract, reserve capacity, or commit either party to the project.",
      "You confirm that the information you provide is accurate and that you are authorised to share it.",
    ],
  },
  {
    title: "2. Estimates and pricing",
    body: [
      "Budget ranges shown on this site are indicative. Any figure we quote in response to your requirement is an estimate based on the scope you described and may change if the scope changes.",
      "A binding price is only established in a signed proposal or written agreement.",
    ],
  },
  {
    title: "3. Confidentiality",
    body: [
      "We treat the details of your project as confidential and share them only within our team for the purpose of evaluating and delivering the work. We are happy to sign an NDA on request.",
    ],
  },
  {
    title: "4. Intellectual property",
    body: [
      "You retain ownership of the ideas, content, brand assets and materials you submit. Ownership of work we produce transfers to you as set out in the project agreement, normally on final payment.",
    ],
  },
  {
    title: "5. Acceptable use",
    body: [
      "Do not use this form to submit unlawful, infringing, malicious or abusive content, or to request work that would breach applicable law. We may decline any enquiry at our discretion.",
    ],
  },
  {
    title: "6. Availability and liability",
    body: [
      "This website is provided on an as-is basis. We aim for continuous availability but do not guarantee uninterrupted access, and we are not liable for indirect or consequential loss arising from use of the site.",
    ],
  },
  {
    title: "7. Changes",
    body: [
      "We may update these terms. The version published on this page at the time of your submission is the version that applies.",
    ],
  },
];

function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-bold">Terms &amp; Conditions</h1>
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
