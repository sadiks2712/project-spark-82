import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Globe,
  Smartphone,
  Bot,
  Boxes,
  Loader2,
  Pencil,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  AI_REQUIREMENTS,
  AUTOMATION_TARGETS,
  AUTOMATION_TOOLS,
  BUDGETS,
  COMMUNICATION_METHODS,
  DESIGN_STYLES,
  MOBILE_FEATURES,
  MOBILE_PLATFORMS,
  PAYMENT_GATEWAYS,
  PROJECT_TYPES,
  SOFTWARE_MODULES,
  TIMELINES,
  WEBSITE_FEATURES,
  WEBSITE_PAGES,
  WEBSITE_PURPOSES,
  YES_NO_UNSURE,
  buildPayload,
  emptyForm,
  generateRequirementId,
  type ProjectType,
  type RequirementForm,
} from "@/lib/requirement";
import { sendRequirementEmails, emailConfigured } from "@/services/emailService";
import {
  MultiSelect,
  OptionGroup,
  StepHeading,
  TextAreaField,
  TextField,
} from "@/components/request/fields";
import { FileUpload, type UploadedFile } from "@/components/request/file-upload";
import { IdeaAssistant } from "@/components/request/idea-assistant";

const STORAGE_KEY = "buildbrief:draft";
export const RESULT_KEY = "buildbrief:result";

const STEPS = [
  "Project Type",
  "Requirements",
  "Features",
  "Design & Technical",
  "Budget & Timeline",
  "Contact",
  "Review",
];

const TYPE_ICONS: Record<ProjectType, typeof Globe> = {
  website: Globe,
  mobile: Smartphone,
  automation: Bot,
  software: Boxes,
};

const HELP_ME_CHOOSE: { need: string; answer: string; type: ProjectType }[] = [
  {
    need: "I need an online presence people can visit and trust",
    answer: "Website",
    type: "website",
  },
  {
    need: "My users should install something on their phone",
    answer: "Mobile App",
    type: "mobile",
  },
  {
    need: "My team repeats manual work every day",
    answer: "Automation & AI",
    type: "automation",
  },
  {
    need: "I need an internal system to run my operations",
    answer: "Custom Software",
    type: "software",
  },
];

type Errors = Partial<Record<keyof RequirementForm, string>>;

export function RequirementWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RequirementForm>(emptyForm);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore draft so data is never lost between steps or reloads.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setForm({ ...emptyForm, ...(JSON.parse(raw) as RequirementForm) });
    } catch {
      /* ignore corrupt draft */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* storage unavailable */
    }
  }, [form, hydrated]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const set = useCallback(<K extends keyof RequirementForm>(key: K, value: RequirementForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }, []);

  const type = form.projectType as ProjectType | "";

  const validate = (index: number): Errors => {
    const e: Errors = {};
    const need = (k: keyof RequirementForm, msg: string) => {
      const v = form[k];
      if (Array.isArray(v) ? v.length === 0 : !String(v).trim()) e[k] = msg;
    };

    if (index === 0 && !form.projectType) e.projectType = "Select a project type to continue";

    if (index === 1) {
      need("projectName", "Give your project a name");
      need("description", "Describe your project in a few sentences");
      if (form.description.trim().length > 0 && form.description.trim().length < 20)
        e.description = "Please add a little more detail (at least 20 characters)";
      if (type === "website") {
        need("websitePurpose", "Choose the main purpose");
        need("targetAudience", "Who is this website for?");
      }
      if (type === "mobile") {
        need("platforms", "Choose at least one platform");
        need("targetAudience", "Who will use the app?");
      }
      if (type === "automation") {
        need("automationTargets", "Select what you want to automate");
        need("desiredWorkflow", "Describe what should happen automatically");
      }
      if (type === "software") {
        need("problemStatement", "What problem should the software solve?");
        need("softwareUsers", "Who will use it?");
      }
    }

    if (index === 2) {
      if (type === "software") need("modules", "Select at least one module");
      else if (type === "automation") need("aiRequirements", "Select an AI option (or 'No AI')");
      else need("features", "Select at least one feature");
    }

    if (index === 4) {
      need("budget", "Select a budget range");
      need("timeline", "Select a timeline");
      if (form.budget === "Custom Budget") need("customBudget", "Enter your budget");
      if (form.timeline === "Specific Date") need("specificDate", "Pick a date");
    }

    if (index === 5) {
      need("fullName", "Enter your full name");
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email address";
      if (form.phone.trim().replace(/\D/g, "").length < 7)
        e.phone = "Enter a valid phone / WhatsApp number";
      need("communicationMethod", "Choose how we should contact you");
    }

    return e;
  };

  const goNext = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) {
      toast.error("Please complete the highlighted fields.");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const allValid = useMemo(
    () => [0, 1, 2, 4, 5].every((i) => Object.keys(validate(i)).length === 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form],
  );

  const submit = async () => {
    for (const i of [0, 1, 2, 4, 5]) {
      const e = validate(i);
      if (Object.keys(e).length) {
        setErrors(e);
        setStep(i);
        toast.error("Some details are still missing.");
        return;
      }
    }

    setSubmitting(true);
    const requirementId = generateRequirementId();
    const submittedDate = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
    const payload = buildPayload(
      { ...form, fileNames: files.filter((f) => !f.error).map((f) => f.name) },
      requirementId,
      submittedDate,
    );

    // 1) Persist to the CSV record first — this must succeed.
    let storage: "disk" | "memory" = "memory";
    try {
      const res = await fetch("/api/submit-requirement", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        success: boolean;
        message?: string;
        storage?: "disk" | "memory";
      };
      if (!res.ok || !data.success) {
        toast.error(
          data.message ??
            "Something went wrong while submitting your requirement. Please try again.",
        );
        setSubmitting(false);
        return;
      }
      storage = data.storage ?? "memory";
    } catch {
      toast.error(
        "We couldn't reach the server. Please check your connection and try again — your answers are saved.",
      );
      setSubmitting(false);
      return;
    }

    // 2) Emails are best-effort: a failure must never lose the saved requirement.
    let emailResult = { business: false, customer: false };
    try {
      emailResult = await sendRequirementEmails(payload);
    } catch {
      emailResult = { business: false, customer: false };
    }

    try {
      sessionStorage.setItem(
        RESULT_KEY,
        JSON.stringify({ payload, emailResult, storage, emailConfigured }),
      );
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }

    setSubmitting(false);
    void navigate({ to: "/success" });
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-10 pb-32 sm:px-6 sm:pb-16">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold">
            Step {step + 1} of {STEPS.length}
            <span className="ml-2 font-normal text-muted-foreground">{STEPS[step]}</span>
          </p>
          <p className="text-xs text-muted-foreground">{Math.round(progress)}% complete</p>
        </div>
        <Progress value={progress} className="mt-3 h-2" />
        <ol className="mt-4 hidden flex-wrap gap-x-4 gap-y-2 md:flex">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium transition-colors",
                  i === step
                    ? "text-primary"
                    : i < step
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-muted-foreground/50",
                )}
              >
                <span
                  className={cn(
                    "grid size-4 place-items-center rounded-full border text-[9px]",
                    i < step
                      ? "border-primary bg-primary text-primary-foreground"
                      : i === step
                        ? "border-primary text-primary"
                        : "border-border",
                  )}
                >
                  {i < step ? <Check className="size-2.5" /> : i + 1}
                </span>
                {label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <Card key={step} className="animate-rise rounded-3xl border-border p-6 shadow-soft sm:p-9">
        {step === 0 && <StepType form={form} set={set} error={errors.projectType} />}
        {step === 1 && <StepRequirements form={form} set={set} errors={errors} type={type} />}
        {step === 2 && <StepFeatures form={form} set={set} errors={errors} type={type} />}
        {step === 3 && (
          <StepDesign form={form} set={set} files={files} setFiles={setFiles} type={type} />
        )}
        {step === 4 && <StepBudget form={form} set={set} errors={errors} />}
        {step === 5 && <StepContact form={form} set={set} errors={errors} />}
        {step === 6 && <StepReview form={form} files={files} onEdit={setStep} />}
      </Card>

      {/* Navigation */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl sm:static sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={goBack}
            disabled={step === 0 || submitting}
            className="rounded-full"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button type="button" size="lg" onClick={goNext} className="rounded-full">
              Continue
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              onClick={submit}
              disabled={submitting || !allValid}
              className="rounded-full"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? "Submitting…" : "Submit Project Requirement"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

type SetFn = <K extends keyof RequirementForm>(key: K, value: RequirementForm[K]) => void;

/* ---------------------------------- Step 1 --------------------------------- */

function StepType({
  form,
  set,
  error,
}: {
  form: RequirementForm;
  set: SetFn;
  error?: string | undefined;
}) {
  return (
    <div>
      <StepHeading
        title="What do you want to build?"
        description="Pick the closest match — we'll ask the right follow-up questions based on your choice."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECT_TYPES.map((t) => {
          const Icon = TYPE_ICONS[t.value];
          const active = form.projectType === t.value;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => set("projectType", t.value)}
              className={cn(
                "card-interactive rounded-2xl border p-6 text-left",
                active
                  ? "border-primary bg-accent/60 shadow-glow"
                  : "border-border bg-card",
              )}
            >
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl",
                  active ? "bg-gradient-brand text-primary-foreground" : "bg-secondary text-primary",
                )}
              >
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{t.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t.description}
              </p>
              <span
                className={cn(
                  "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {active ? (
                  <>
                    <Check className="size-4" /> Selected
                  </>
                ) : (
                  <>
                    Select <ArrowRight className="size-4" />
                  </>
                )}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-4 text-sm font-medium text-destructive">{error}</p>}

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm font-medium">Not sure what you need?</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm" className="rounded-full">
              <HelpCircle className="size-4" />
              Help Me Choose
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Which one fits you?</DialogTitle>
              <DialogDescription>
                Pick the statement closest to your situation and we&apos;ll select the matching
                project type.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              {HELP_ME_CHOOSE.map((h) => (
                <button
                  key={h.type}
                  type="button"
                  onClick={() => set("projectType", h.type)}
                  className="w-full rounded-xl border border-border p-4 text-left transition-colors hover:border-primary/60 hover:bg-accent/50"
                >
                  <p className="text-sm font-medium">{h.need}</p>
                  <p className="mt-1 text-xs text-primary">→ {h.answer}</p>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

/* ---------------------------------- Step 2 --------------------------------- */

function StepRequirements({
  form,
  set,
  errors,
  type,
}: {
  form: RequirementForm;
  set: SetFn;
  errors: Errors;
  type: ProjectType | "";
}) {
  const nameLabel =
    type === "mobile" ? "App name" : type === "automation" ? "Automation name" : "Project name";

  return (
    <div className="space-y-6">
      <StepHeading
        title="Tell us about the project"
        description="The more specific you are here, the more accurate our scope and estimate will be."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label={nameLabel}
          required
          value={form.projectName}
          onChange={(v) => set("projectName", v)}
          error={errors.projectName}
          placeholder="e.g. Farmers Marketplace"
        />
        <TextField
          label="Business / company name"
          value={form.companyName}
          onChange={(v) => set("companyName", v)}
          placeholder="Optional"
        />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-medium">Project description</span>
          {type && (
            <IdeaAssistant
              projectType={type}
              onInsert={(text) =>
                set("description", form.description ? `${form.description}\n\n${text}` : text)
              }
            />
          )}
        </div>
        <TextAreaField
          label={type === "mobile" ? "Describe your app idea" : "Describe your project"}
          required
          rows={7}
          value={form.description}
          onChange={(v) => set("description", v)}
          error={errors.description}
          placeholder="What are you building, and what should it achieve?"
        />
      </div>

      {type === "website" && (
        <>
          <TextAreaField
            label="What does your business do?"
            rows={3}
            value={form.businessDescription}
            onChange={(v) => set("businessDescription", v)}
          />
          <OptionGroup
            label="Main purpose of the website"
            required
            options={WEBSITE_PURPOSES}
            value={form.websitePurpose}
            onChange={(v) => set("websitePurpose", v)}
            error={errors.websitePurpose}
          />
          <TextField
            label="Target audience"
            required
            value={form.targetAudience}
            onChange={(v) => set("targetAudience", v)}
            error={errors.targetAudience}
            placeholder="e.g. Small business owners in India"
          />
          <MultiSelect
            label="Pages you need"
            options={WEBSITE_PAGES}
            values={form.pages}
            onChange={(v) => set("pages", v)}
          />
        </>
      )}

      {type === "mobile" && (
        <>
          <TextField
            label="Main purpose of the app"
            value={form.mainPurpose}
            onChange={(v) => set("mainPurpose", v)}
            placeholder="e.g. Let farmers list and sell produce directly"
          />
          <TextField
            label="Target users"
            required
            value={form.targetAudience}
            onChange={(v) => set("targetAudience", v)}
            error={errors.targetAudience}
          />
          <MultiSelect
            label="Platforms"
            required
            options={MOBILE_PLATFORMS}
            values={form.platforms}
            onChange={(v) => set("platforms", v)}
            error={errors.platforms}
          />
          <OptionGroup
            label="Do you need a backend / database?"
            options={YES_NO_UNSURE}
            value={form.needsBackend}
            onChange={(v) => set("needsBackend", v)}
          />
        </>
      )}

      {type === "automation" && (
        <>
          <MultiSelect
            label="What do you want to automate?"
            required
            options={AUTOMATION_TARGETS}
            values={form.automationTargets}
            onChange={(v) => set("automationTargets", v)}
            error={errors.automationTargets}
          />
          <TextAreaField
            label="How do you currently perform this task?"
            rows={5}
            value={form.currentProcess}
            onChange={(v) => set("currentProcess", v)}
            placeholder="Walk us through the manual steps today, including who does what."
          />
          <TextAreaField
            label="What should happen automatically?"
            required
            rows={6}
            value={form.desiredWorkflow}
            onChange={(v) => set("desiredWorkflow", v)}
            error={errors.desiredWorkflow}
            placeholder="e.g. When a customer sends a WhatsApp message, automatically reply, show products, collect the order and send a payment link."
          />
          <MultiSelect
            label="Tools you currently use"
            options={AUTOMATION_TOOLS}
            values={form.currentTools}
            onChange={(v) => set("currentTools", v)}
          />
        </>
      )}

      {type === "software" && (
        <>
          <TextAreaField
            label="What problem should the software solve?"
            required
            rows={5}
            value={form.problemStatement}
            onChange={(v) => set("problemStatement", v)}
            error={errors.problemStatement}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Who will use it?"
              required
              value={form.softwareUsers}
              onChange={(v) => set("softwareUsers", v)}
              error={errors.softwareUsers}
              placeholder="e.g. Operations team and field staff"
            />
            <TextField
              label="Expected number of users"
              value={form.expectedUsers}
              onChange={(v) => set("expectedUsers", v)}
              placeholder="e.g. 25 internal, 500 customers"
            />
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------------------------- Step 3 --------------------------------- */

function StepFeatures({
  form,
  set,
  errors,
  type,
}: {
  form: RequirementForm;
  set: SetFn;
  errors: Errors;
  type: ProjectType | "";
}) {
  const featureOptions =
    type === "mobile" ? MOBILE_FEATURES : type === "website" ? WEBSITE_FEATURES : [];

  const selected = type === "software" ? form.modules : form.features;
  const has = (needle: string) =>
    selected.some((s) => s.toLowerCase().includes(needle.toLowerCase()));

  const wantsPayment = has("payment");
  const wantsChatbot =
    has("chat") ||
    form.aiRequirements.some((a) => a.toLowerCase().includes("chatbot")) ||
    form.automationTargets.some((a) => a.toLowerCase().includes("chatbot"));
  const wantsAdmin = has("admin");
  const wantsLocation = has("gps") || has("maps") || has("location");

  return (
    <div className="space-y-6">
      <StepHeading
        title={type === "software" ? "Modules & capabilities" : "Features you need"}
        description="Select everything that applies. We'll only ask follow-up questions for what you choose."
      />

      {type === "software" ? (
        <MultiSelect
          label="Required modules"
          required
          options={SOFTWARE_MODULES}
          values={form.modules}
          onChange={(v) => set("modules", v)}
          error={errors.modules}
        />
      ) : type === "automation" ? (
        <MultiSelect
          label="AI requirements"
          required
          options={AI_REQUIREMENTS}
          values={form.aiRequirements}
          onChange={(v) => set("aiRequirements", v)}
          error={errors.aiRequirements}
        />
      ) : (
        <MultiSelect
          label="Features"
          required
          options={featureOptions}
          values={form.features}
          onChange={(v) => set("features", v)}
          error={errors.features}
        />
      )}

      {(type === "website" || type === "mobile" || type === "software") && (
        <MultiSelect
          label="AI requirements (optional)"
          options={AI_REQUIREMENTS}
          values={form.aiRequirements}
          onChange={(v) => set("aiRequirements", v)}
        />
      )}

      {/* Smart conditional questions */}
      {wantsPayment && (
        <OptionGroup
          label="Which payment gateway?"
          options={PAYMENT_GATEWAYS}
          value={form.paymentGateway}
          onChange={(v) => set("paymentGateway", v)}
        />
      )}
      {wantsChatbot && (
        <TextAreaField
          label="What should the chatbot do?"
          rows={4}
          value={form.chatbotPurpose}
          onChange={(v) => set("chatbotPurpose", v)}
          placeholder="e.g. Answer product questions, capture leads and hand over to a human when asked."
        />
      )}
      {wantsAdmin && (
        <TextAreaField
          label="What should the admin manage?"
          rows={4}
          value={form.adminScope}
          onChange={(v) => set("adminScope", v)}
          placeholder="e.g. Products, orders, customers, content and reports."
        />
      )}
      {wantsLocation && (
        <TextAreaField
          label="What location functionality is required?"
          rows={4}
          value={form.locationFunctionality}
          onChange={(v) => set("locationFunctionality", v)}
          placeholder="e.g. Show nearby sellers, live delivery tracking, geofenced alerts."
        />
      )}
    </div>
  );
}

/* ---------------------------------- Step 4 --------------------------------- */

function StepDesign({
  form,
  set,
  files,
  setFiles,
  type,
}: {
  form: RequirementForm;
  set: SetFn;
  files: UploadedFile[];
  setFiles: (f: UploadedFile[]) => void;
  type: ProjectType | "";
}) {
  return (
    <div className="space-y-6">
      <StepHeading
        title="Design & technical preferences"
        description="Optional, but it helps us match your taste and existing stack from day one."
      />

      <MultiSelect
        label="Design direction"
        options={DESIGN_STYLES}
        values={form.designStyles}
        onChange={(v) => set("designStyles", v)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label={type === "mobile" ? "Reference app links" : "Reference website URLs"}
          value={form.referenceUrls}
          onChange={(v) => set("referenceUrls", v)}
          placeholder="https://…"
        />
        <TextField
          label="Figma / design file URL"
          value={form.figmaUrl}
          onChange={(v) => set("figmaUrl", v)}
          placeholder="https://figma.com/…"
        />
      </div>

      <TextAreaField
        label="Technical requirements"
        rows={4}
        value={form.technicalRequirements}
        onChange={(v) => set("technicalRequirements", v)}
        placeholder="Preferred stack, hosting, existing systems, compliance needs…"
      />
      <TextAreaField
        label="Integrations needed"
        rows={3}
        value={form.integrations}
        onChange={(v) => set("integrations", v)}
        placeholder="CRM, ERP, payment, WhatsApp, Google Sheets, third-party APIs…"
      />

      <FileUpload files={files} onChange={setFiles} />
    </div>
  );
}

/* ---------------------------------- Step 5 --------------------------------- */

function StepBudget({
  form,
  set,
  errors,
}: {
  form: RequirementForm;
  set: SetFn;
  errors: Errors;
}) {
  return (
    <div className="space-y-6">
      <StepHeading
        title="Budget & timeline"
        description="An honest range helps us propose a scope that actually fits — nothing is locked in."
      />

      <OptionGroup
        label="Budget range"
        required
        options={BUDGETS}
        value={form.budget}
        onChange={(v) => set("budget", v)}
        error={errors.budget}
      />
      {form.budget === "Custom Budget" && (
        <TextField
          label="Your budget"
          required
          value={form.customBudget}
          onChange={(v) => set("customBudget", v)}
          error={errors.customBudget}
          placeholder="e.g. ₹3,50,000"
        />
      )}

      <OptionGroup
        label="Timeline"
        required
        options={TIMELINES}
        value={form.timeline}
        onChange={(v) => set("timeline", v)}
        error={errors.timeline}
      />
      {form.timeline === "Specific Date" && (
        <TextField
          label="Target date"
          type="date"
          required
          value={form.specificDate}
          onChange={(v) => set("specificDate", v)}
          error={errors.specificDate}
        />
      )}

      <TextField
        label="Is there a specific launch / event deadline?"
        value={form.deadline}
        onChange={(v) => set("deadline", v)}
        placeholder="e.g. Trade show on 12 Nov, or none"
      />
    </div>
  );
}

/* ---------------------------------- Step 6 --------------------------------- */

function StepContact({
  form,
  set,
  errors,
}: {
  form: RequirementForm;
  set: SetFn;
  errors: Errors;
}) {
  return (
    <div className="space-y-6">
      <StepHeading
        title="How can we reach you?"
        description="We'll send a confirmation with your Requirement ID straight away."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Full name"
          required
          value={form.fullName}
          onChange={(v) => set("fullName", v)}
          error={errors.fullName}
        />
        <TextField
          label="Company / business name"
          value={form.companyName}
          onChange={(v) => set("companyName", v)}
        />
        <TextField
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          placeholder="you@company.com"
        />
        <TextField
          label="Phone / WhatsApp"
          required
          value={form.phone}
          onChange={(v) => set("phone", v)}
          error={errors.phone}
          placeholder="+91 90000 00000"
        />
        <TextField
          label="Country"
          value={form.country}
          onChange={(v) => set("country", v)}
          placeholder="India"
        />
      </div>

      <MultiSelect
        label="Preferred communication method"
        required
        options={COMMUNICATION_METHODS}
        values={form.communicationMethod}
        onChange={(v) => set("communicationMethod", v)}
        error={errors.communicationMethod}
      />

      <div className="grid gap-6 sm:grid-cols-3">
        <TextField
          label="Company website"
          value={form.companyWebsite}
          onChange={(v) => set("companyWebsite", v)}
          placeholder="Optional"
        />
        <TextField
          label="LinkedIn"
          value={form.linkedin}
          onChange={(v) => set("linkedin", v)}
          placeholder="Optional"
        />
        <TextField
          label="Social media"
          value={form.socialMedia}
          onChange={(v) => set("socialMedia", v)}
          placeholder="Optional"
        />
      </div>
    </div>
  );
}

/* ---------------------------------- Step 7 --------------------------------- */

function ReviewBlock({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: number;
  onEdit: (s: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {title}
        </h3>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 rounded-full px-3 text-xs"
          onClick={() => onEdit(step)}
        >
          <Pencil className="size-3" />
          Edit
        </Button>
      </div>
      <div className="mt-3 space-y-2 text-sm">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <p className="grid gap-0.5 sm:grid-cols-[160px_1fr]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium whitespace-pre-wrap">{value}</span>
    </p>
  );
}

function StepReview({
  form,
  files,
  onEdit,
}: {
  form: RequirementForm;
  files: UploadedFile[];
  onEdit: (s: number) => void;
}) {
  const typeMeta = PROJECT_TYPES.find((t) => t.value === form.projectType);
  const featureList =
    form.projectType === "software"
      ? form.modules
      : form.projectType === "automation"
        ? form.aiRequirements
        : form.features;

  return (
    <div className="space-y-4">
      <StepHeading
        title="Review your requirement"
        description="Check everything below. You can edit any section before submitting."
      />

      <ReviewBlock title="Project type" step={0} onEdit={onEdit}>
        <p className="font-medium">{typeMeta?.title ?? "—"}</p>
      </ReviewBlock>

      <ReviewBlock title="Project details" step={1} onEdit={onEdit}>
        <Row label="Project name" value={form.projectName} />
        <Row label="Company" value={form.companyName} />
        <Row label="Description" value={form.description} />
        <Row label="Purpose" value={form.websitePurpose || form.mainPurpose} />
        <Row label="Target users" value={form.targetAudience || form.softwareUsers} />
        <Row label="Platforms" value={form.platforms.join(", ")} />
        <Row label="Pages" value={form.pages.join(", ")} />
        <Row label="Automate" value={form.automationTargets.join(", ")} />
        <Row label="Desired workflow" value={form.desiredWorkflow} />
        <Row label="Problem to solve" value={form.problemStatement} />
      </ReviewBlock>

      <ReviewBlock title="Features" step={2} onEdit={onEdit}>
        {featureList.length ? (
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {featureList.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                {f}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">—</p>
        )}
        <Row label="Payment gateway" value={form.paymentGateway} />
        <Row label="Chatbot should" value={form.chatbotPurpose} />
        <Row label="Admin manages" value={form.adminScope} />
        <Row label="Location needs" value={form.locationFunctionality} />
      </ReviewBlock>

      <ReviewBlock title="Design & technical" step={3} onEdit={onEdit}>
        <Row label="Design direction" value={form.designStyles.join(", ")} />
        <Row label="References" value={[form.referenceUrls, form.figmaUrl].filter(Boolean).join("\n")} />
        <Row label="Technical" value={form.technicalRequirements} />
        <Row label="Integrations" value={form.integrations} />
        <Row
          label="Files"
          value={files.filter((f) => !f.error).map((f) => f.name).join(", ")}
        />
      </ReviewBlock>

      <ReviewBlock title="Budget & timeline" step={4} onEdit={onEdit}>
        <Row
          label="Budget"
          value={form.budget === "Custom Budget" ? form.customBudget : form.budget}
        />
        <Row
          label="Timeline"
          value={
            form.timeline === "Specific Date" && form.specificDate
              ? `Specific Date (${form.specificDate})`
              : form.timeline
          }
        />
        <Row label="Deadline" value={form.deadline} />
      </ReviewBlock>

      <ReviewBlock title="Contact" step={5} onEdit={onEdit}>
        <Row label="Name" value={form.fullName} />
        <Row label="Email" value={form.email} />
        <Row label="Phone / WhatsApp" value={form.phone} />
        <Row label="Country" value={form.country} />
        <Row label="Preferred contact" value={form.communicationMethod.join(", ")} />
        <Row label="Website" value={form.companyWebsite} />
        <Row label="LinkedIn" value={form.linkedin} />
        <Row label="Social" value={form.socialMedia} />
      </ReviewBlock>

      {!emailConfigured && (
        <p className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-xs text-muted-foreground">
          Email delivery is not configured yet, so confirmation emails will be skipped. Your
          requirement will still be recorded and you&apos;ll get a downloadable summary.
        </p>
      )}
    </div>
  );
}
