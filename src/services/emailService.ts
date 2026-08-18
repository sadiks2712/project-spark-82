import emailjs from "@emailjs/browser";
import type { RequirementPayload } from "@/lib/requirement";

/**
 * EmailJS wrapper. All configuration comes from environment variables — never
 * hardcode credentials in components. The EmailJS public key is designed for
 * client-side use, so exposing it in the browser bundle is expected.
 */
const PUBLIC_KEY = (import.meta.env['VITE_EMAILJS_PUBLIC_KEY'] ?? "").trim();
const SERVICE_ID = (import.meta.env['VITE_EMAILJS_SERVICE_ID'] ?? "").trim();
const TEMPLATE_ID = (import.meta.env['VITE_EMAILJS_TEMPLATE_ID'] ?? "").trim();
const CUSTOMER_TEMPLATE_ID = (
  import.meta.env['VITE_EMAILJS_CUSTOMER_TEMPLATE_ID'] ?? TEMPLATE_ID
).trim();
const BUSINESS_EMAIL = (import.meta.env['VITE_BUSINESS_EMAIL'] ?? "").trim();

export const emailConfigured = Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID);

function baseParams(p: RequirementPayload) {
  return {
    requirement_id: p.requirement_id,
    submitted_date: p.submitted_date,
    customer_name: p.customer_name,
    customer_email: p.email,
    customer_phone: p.phone,
    company_name: p.company_name || "—",
    country: p.country || "—",
    communication_method: p.communication_method || "—",
    project_type: p.project_type,
    project_name: p.project_name,
    description: p.description,
    target_users: p.target_users || "—",
    features: p.features || "—",
    pages: p.pages || "—",
    design_preferences: p.design_preferences || "—",
    technical_requirements: p.technical_requirements || "—",
    integrations: p.integrations || "—",
    automation_details: p.automation_details || "—",
    ai_requirements: p.ai_requirements || "—",
    reference_urls: p.reference_urls || "—",
    budget: p.budget || "—",
    timeline: p.timeline || "—",
    deadline: p.deadline || "—",
    file_names: p.file_names || "—",
  };
}

async function send(templateId: string, params: Record<string, string>) {
  return emailjs.send(SERVICE_ID, templateId, params, { publicKey: PUBLIC_KEY });
}

export type EmailResult = {
  business: boolean;
  customer: boolean;
};

export async function sendRequirementEmails(p: RequirementPayload): Promise<EmailResult> {
  if (!emailConfigured) return { business: false, customer: false };

  const base = baseParams(p);

  const businessParams = {
    ...base,
    email_kind: "business",
    to_name: "Team",
    to_email: BUSINESS_EMAIL || p.email,
    reply_to: p.email,
    subject: `New Project Requirement - ${p.requirement_id}`,
    message: [
      `New project requirement received.`,
      ``,
      `Requirement ID: ${p.requirement_id}`,
      `Submitted: ${p.submitted_date}`,
      `Customer: ${p.customer_name} (${p.email}, ${p.phone})`,
      `Company: ${p.company_name || "—"}`,
      `Project Type: ${p.project_type}`,
      `Project Name: ${p.project_name}`,
      ``,
      `Description:\n${p.description}`,
      ``,
      `Features: ${p.features || "—"}`,
      `Pages: ${p.pages || "—"}`,
      `Design: ${p.design_preferences || "—"}`,
      `Technical: ${p.technical_requirements || "—"}`,
      `Automation: ${p.automation_details || "—"}`,
      `AI: ${p.ai_requirements || "—"}`,
      `Integrations: ${p.integrations || "—"}`,
      `References: ${p.reference_urls || "—"}`,
      `Budget: ${p.budget || "—"}`,
      `Timeline: ${p.timeline || "—"}`,
      `Deadline: ${p.deadline || "—"}`,
      `Files: ${p.file_names || "—"}`,
    ].join("\n"),
  };

  const customerParams = {
    ...base,
    email_kind: "customer",
    to_name: p.customer_name,
    to_email: p.email,
    reply_to: BUSINESS_EMAIL || p.email,
    subject: `Requirement Received - ${p.requirement_id}`,
    message: [
      `Hi ${p.customer_name},`,
      ``,
      `Thank you for sharing your project requirement. We have received it successfully.`,
      ``,
      `Requirement ID: ${p.requirement_id}`,
      `Project Type: ${p.project_type}`,
      `Project Name: ${p.project_name}`,
      `Budget: ${p.budget || "—"}`,
      `Timeline: ${p.timeline || "—"}`,
      ``,
      `Summary:\n${p.description}`,
      ``,
      `Next steps:`,
      `1. Our team reviews your requirement.`,
      `2. We prepare a scope, approach and estimate.`,
      `3. We contact you on your preferred channel (${p.communication_method || "email"}).`,
      ``,
      `Please keep your Requirement ID for future reference.`,
    ].join("\n"),
  };

  const [business, customer] = await Promise.allSettled([
    send(TEMPLATE_ID, businessParams),
    send(CUSTOMER_TEMPLATE_ID, customerParams),
  ]);

  return {
    business: business.status === "fulfilled",
    customer: customer.status === "fulfilled",
  };
}
