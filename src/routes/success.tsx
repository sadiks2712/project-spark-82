import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RESULT_KEY } from "@/components/request/wizard";
import { buildSummaryText, type RequirementPayload } from "@/lib/requirement";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "Requirement Submitted — SoftWare Hub" },
      {
        name: "description",
        content:
          "Your project requirement has been received. Keep your Requirement ID and download a copy of your brief.",
      },
      { property: "og:title", content: "Requirement Submitted — SoftWare Hub" },
      { property: "og:description", content: "Your project requirement has been received." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

type Result = {
  payload: RequirementPayload;
  emailResult: { business: boolean; customer: boolean };
  storage: "disk" | "memory";
  emailConfigured: boolean;
};

function SuccessPage() {
  const [result, setResult] = useState<Result | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(RESULT_KEY);
      if (raw) setResult(JSON.parse(raw) as Result);
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const download = () => {
    if (!result) return;
    const blob = new Blob([buildSummaryText(result.payload)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.payload.requirement_id}-requirement.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loaded && !result) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold">Nothing to show here yet</h1>
        <p className="mt-3 text-muted-foreground">
          This page displays your submission summary right after you send a requirement.
        </p>
        <Button asChild className="mt-8 rounded-full">
          <Link to="/request">Start Your Project</Link>
        </Button>
      </div>
    );
  }

  const p = result?.payload;
  const emailFailed =
    result && result.emailConfigured && !(result.emailResult.business && result.emailResult.customer);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-success/15">
          <CheckCircle2 className="size-8 text-success" />
        </span>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
          Requirement Submitted Successfully!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for sharing your project idea. We&apos;ll review your requirements and
          contact you soon.
        </p>
      </div>

      <Card className="mt-10 rounded-3xl border-primary/30 p-8 text-center shadow-glow">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Your Requirement ID
        </p>
        <p className="mt-3 font-display text-3xl font-bold text-gradient-brand">
          {p?.requirement_id}
        </p>
        <div className="mt-8 grid gap-4 border-t border-border pt-6 text-left sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Project Type</p>
            <p className="mt-1 font-medium capitalize">{p?.project_type}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Project Name</p>
            <p className="mt-1 font-medium">{p?.project_name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Submitted</p>
            <p className="mt-1 font-medium">{p?.submitted_date}</p>
          </div>
        </div>
      </Card>

      {emailFailed && (
        <div className="mt-6 flex gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
          <p className="text-muted-foreground">
            Your requirement was saved successfully, but the confirmation email couldn&apos;t be
            delivered. Nothing is lost — please download your summary below and we&apos;ll still
            reach out using the contact details you provided.
          </p>
        </div>
      )}

      {result?.storage === "memory" && (
        <div className="mt-4 flex gap-3 rounded-2xl border border-border bg-surface p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-muted-foreground">
            This deployment uses temporary server storage, so please keep a copy of your summary
            for your own records.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" className="rounded-full" onClick={download}>
          <Download className="size-4" />
          Download Requirement Summary
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full">
          <Link to="/">Return Home</Link>
        </Button>
        <Button asChild size="lg" variant="ghost" className="rounded-full">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
