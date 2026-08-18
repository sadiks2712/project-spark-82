import { createFileRoute } from "@tanstack/react-router";
import { RequirementWizard } from "@/components/request/wizard";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Start Your Project — Share Your Requirement | SoftWare Hub" },
      {
        name: "description",
        content:
          "A guided seven-step brief for websites, mobile apps, AI automation and custom software. Get a Requirement ID and confirmation email instantly.",
      },
      { property: "og:title", content: "Start Your Project — Share Your Requirement" },
      {
        property: "og:description",
        content:
          "Answer smart questions about scope, features, budget and timeline. Takes about five minutes.",
      },
    ],
  }),
  component: RequestPage,
});

function RequestPage() {
  return (
    <div className="bg-surface/40">
      <div className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">Tell us what you want to build</h1>
          <p className="mt-3 text-muted-foreground">
            Seven short steps. Your answers are saved as you go, so you can go back and edit
            anything before submitting.
          </p>
        </div>
      </div>
      <RequirementWizard />
    </div>
  );
}
