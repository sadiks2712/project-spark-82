import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  hint?: string | undefined;
  required?: boolean | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  hint,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  error?: string | undefined;
  hint?: string | undefined;
  type?: string | undefined;
}) {
  return (
    <Field label={label} required={required} error={error} hint={hint}>
      <Input
        type={type}
        value={value}
        maxLength={200}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn("h-11 rounded-xl", error && "border-destructive")}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  hint,
  rows = 4,
  maxLength = 3000,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  error?: string | undefined;
  hint?: string | undefined;
  rows?: number | undefined;
  maxLength?: number | undefined;
}) {
  return (
    <Field label={label} required={required} error={error} hint={hint}>
      <Textarea
        rows={rows}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn("resize-y rounded-xl", error && "border-destructive")}
      />
      <p className="text-right text-[11px] text-muted-foreground">
        {value.length}/{maxLength}
      </p>
    </Field>
  );
}

/** Single-select pill group. */
export function OptionGroup({
  label,
  options,
  value,
  onChange,
  required,
  error,
  hint,
  columns = 3,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean | undefined;
  error?: string | undefined;
  hint?: string | undefined;
  columns?: 2 | 3 | undefined;
}) {
  return (
    <Field label={label} required={required} error={error} hint={hint}>
      <div
        className={cn(
          "grid gap-2",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(active ? "" : opt)}
              aria-pressed={active}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
                active
                  ? "border-primary bg-accent text-foreground shadow-glow"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

/** Multi-select checkbox chip group. */
export function MultiSelect({
  label,
  options,
  values,
  onChange,
  required,
  error,
  hint,
}: {
  label: string;
  options: readonly string[];
  values: string[];
  onChange: (v: string[]) => void;
  required?: boolean | undefined;
  error?: string | undefined;
  hint?: string | undefined;
}) {
  const toggle = (opt: string) =>
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]);

  return (
    <Field label={label} required={required} error={error} hint={hint}>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {active && <Check className="size-3.5" />}
              {opt}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

export function StepHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}
