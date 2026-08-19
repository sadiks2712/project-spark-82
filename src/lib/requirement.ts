import { z } from "zod";

export type ProjectType = "website" | "mobile" | "automation" | "software";

export const PROJECT_TYPES: {
  value: ProjectType;
  title: string;
  short: string;
  description: string;
}[] = [
  {
    value: "website",
    title: "Website",
    short: "Website",
    description:
      "Business websites, landing pages, portfolios, e-commerce and web applications.",
  },
  {
    value: "mobile",
    title: "Mobile App",
    short: "Mobile App",
    description: "Android, iOS and cross-platform applications.",
  },
  {
    value: "automation",
    title: "Automation & AI",
    short: "Automation & AI",
    description:
      "AI agents, WhatsApp automation, business workflows and integrations.",
  },
  {
    value: "software",
    title: "Custom Software",
    short: "Custom Software",
    description:
      "Dashboards, SaaS platforms, management systems and custom software.",
  },
];

export const WEBSITE_PURPOSES = [
  "Business Website",
  "Portfolio",
  "Landing Page",
  "E-commerce",
  "Booking System",
  "Blog",
  "SaaS / Web Application",
  "Educational Platform",
  "Marketplace",
  "Other",
];

export const WEBSITE_PAGES = [
  "Home",
  "About",
  "Services",
  "Products",
  "Contact",
  "Blog",
  "Pricing",
  "FAQ",
  "Gallery",
  "Team",
  "Login/Register",
  "User Dashboard",
  "Admin Panel",
  "Other",
];

export const WEBSITE_FEATURES = [
  "Contact Form",
  "Login/Register",
  "Google Login",
  "Database",
  "Admin Dashboard",
  "User Dashboard",
  "Search",
  "Filters",
  "Booking",
  "Chat",
  "Notifications",
  "Maps",
  "Payment Gateway",
  "API Integration",
  "AI Features",
  "Analytics",
  "Multi-language",
  "Dark Mode",
  "Other",
];

export const MOBILE_PLATFORMS = ["Android", "iOS", "Android + iOS", "Web + Mobile"];

export const MOBILE_FEATURES = [
  "Login/Register",
  "Google Login",
  "OTP",
  "User Profiles",
  "GPS/Location",
  "Maps",
  "Push Notifications",
  "Chat",
  "Voice Calling",
  "Video Calling",
  "Payments",
  "Subscription",
  "Camera",
  "Image Upload",
  "AI Features",
  "Admin Panel",
  "Database",
  "Analytics",
  "Social Sharing",
  "Other",
];

export const AUTOMATION_TARGETS = [
  "WhatsApp",
  "Email",
  "Customer Support",
  "Lead Generation",
  "CRM",
  "Order Processing",
  "Reports",
  "Data Entry",
  "Notifications",
  "Social Media",
  "Business Workflow",
  "AI Chatbot",
  "AI Voice Agent",
  "Other",
];

export const AUTOMATION_TOOLS = [
  "WhatsApp",
  "Gmail",
  "Google Sheets",
  "Google Drive",
  "Excel",
  "Shopify",
  "WordPress",
  "CRM",
  "Telegram",
  "Instagram",
  "Facebook",
  "APIs",
  "n8n",
  "Make",
  "Zapier",
  "Other",
];

export const AI_REQUIREMENTS = [
  "AI Chatbot",
  "AI Voice Agent",
  "AI Content Generation",
  "AI Document Processing",
  "AI Data Analysis",
  "AI Recommendation System",
  "AI Customer Support",
  "AI Lead Qualification",
  "No AI",
  "Not Sure",
];

export const SOFTWARE_MODULES = [
  "Admin Panel",
  "User Management",
  "Database",
  "Reports",
  "Analytics",
  "Payment",
  "Notifications",
  "API Integrations",
  "AI Features",
  "Role-based Access",
  "Inventory",
  "Billing / Invoicing",
  "Other",
];

export const DESIGN_STYLES = [
  "Modern",
  "Minimal",
  "Premium",
  "Corporate",
  "Creative",
  "Dark",
  "Light",
  "Not Sure — Recommend for Me",
];

export const PAYMENT_GATEWAYS = ["Razorpay", "Stripe", "PayPal", "Other", "Not Sure"];

export const BUDGETS = [
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "₹2,00,000+",
  "I'm Not Sure",
  "Custom Budget",
];

export const TIMELINES = [
  "ASAP",
  "Within 2 Weeks",
  "Within 1 Month",
  "1–2 Months",
  "2–3 Months",
  "Flexible",
  "Specific Date",
];

export const COMMUNICATION_METHODS = [
  "WhatsApp",
  "Email",
  "Phone Call",
  "Video Meeting",
];

export const YES_NO_UNSURE = ["Yes", "No", "Not Sure"];

export type RequirementForm = {
  projectType: ProjectType | "";

  // shared
  projectName: string;
  companyName: string;
  businessDescription: string;
  mainPurpose: string;
  targetAudience: string;
  description: string;

  // website
  websitePurpose: string;
  pages: string[];

  // mobile
  platforms: string[];
  needsBackend: string;

  // automation
  automationTargets: string[];
  currentProcess: string;
  desiredWorkflow: string;
  currentTools: string[];
  aiRequirements: string[];

  // software
  problemStatement: string;
  softwareUsers: string;
  expectedUsers: string;
  modules: string[];

  // features
  features: string[];

  // conditional
  paymentGateway: string;
  chatbotPurpose: string;
  adminScope: string;
  locationFunctionality: string;

  // design + technical
  designStyles: string[];
  referenceUrls: string;
  figmaUrl: string;
  technicalRequirements: string;
  integrations: string;

  // budget & timeline
  budget: string;
  customBudget: string;
  timeline: string;
  specificDate: string;
  deadline: string;

  // contact
  fullName: string;
  email: string;
  phone: string;
  country: string;
  communicationMethod: string[];
  companyWebsite: string;
  linkedin: string;
  socialMedia: string;

  fileNames: string[];
};

export const emptyForm: RequirementForm = {
  projectType: "",
  projectName: "",
  companyName: "",
  businessDescription: "",
  mainPurpose: "",
  targetAudience: "",
  description: "",
  websitePurpose: "",
  pages: [],
  platforms: [],
  needsBackend: "",
  automationTargets: [],
  currentProcess: "",
  desiredWorkflow: "",
  currentTools: [],
  aiRequirements: [],
  problemStatement: "",
  softwareUsers: "",
  expectedUsers: "",
  modules: [],
  features: [],
  paymentGateway: "",
  chatbotPurpose: "",
  adminScope: "",
  locationFunctionality: "",
  designStyles: [],
  referenceUrls: "",
  figmaUrl: "",
  technicalRequirements: "",
  integrations: "",
  budget: "",
  customBudget: "",
  timeline: "",
  specificDate: "",
  deadline: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  communicationMethod: [],
  companyWebsite: "",
  linkedin: "",
  socialMedia: "",
  fileNames: [],
};

export const CSV_COLUMNS = [
  "requirement_id",
  "submitted_date",
  "customer_name",
  "company_name",
  "email",
  "phone",
  "country",
  "communication_method",
  "project_type",
  "project_name",
  "description",
  "target_users",
  "features",
  "pages",
  "design_preferences",
  "technical_requirements",
  "integrations",
  "automation_details",
  "ai_requirements",
  "reference_urls",
  "budget",
  "timeline",
  "deadline",
  "file_names",
] as const;

export type CsvColumn = (typeof CSV_COLUMNS)[number];
export type RequirementRecord = Record<CsvColumn, string>;

const str = (max: number) => z.string().trim().max(max);

/** Server-side validation schema for the submission payload. */
export const requirementPayloadSchema = z.object({
  requirement_id: z
    .string()
    .trim()
    .regex(/^REQ-\d{4}-\d{5}$/, "Invalid requirement id"),
  submitted_date: str(64),
  customer_name: z.string().trim().min(2).max(120),
  company_name: str(160).optional().default(""),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(40),
  country: str(80).optional().default(""),
  communication_method: str(60).optional().default(""),
  project_type: z.enum(["website", "mobile", "automation", "software"]),
  project_name: z.string().trim().min(2).max(160),
  description: z.string().trim().min(10).max(5000),
  target_users: str(1000).optional().default(""),
  features: str(3000).optional().default(""),
  pages: str(2000).optional().default(""),
  design_preferences: str(2000).optional().default(""),
  technical_requirements: str(3000).optional().default(""),
  integrations: str(2000).optional().default(""),
  automation_details: str(5000).optional().default(""),
  ai_requirements: str(2000).optional().default(""),
  reference_urls: str(2000).optional().default(""),
  budget: str(120).optional().default(""),
  timeline: str(200).optional().default(""),
  deadline: str(200).optional().default(""),
  file_names: str(2000).optional().default(""),
});

export type RequirementPayload = z.infer<typeof requirementPayloadSchema>;

export function generateRequirementId(date = new Date()): string {
  const year = date.getUTCFullYear();
  const n = Math.floor(10000 + Math.random() * 90000);
  return `REQ-${year}-${n}`;
}

const list = (v: string[]) => v.filter(Boolean).join(", ");

export function buildPayload(
  form: RequirementForm,
  requirementId: string,
  submittedDate: string,
): RequirementPayload {
  const budget = form.budget === "Custom Budget" ? form.customBudget || "Custom Budget" : form.budget;
  const timeline =
    form.timeline === "Specific Date" && form.specificDate
      ? `Specific Date (${form.specificDate})`
      : form.timeline;

  const conditional: string[] = [];
  if (form.paymentGateway) conditional.push(`Payment gateway: ${form.paymentGateway}`);
  if (form.chatbotPurpose) conditional.push(`Chatbot should: ${form.chatbotPurpose}`);
  if (form.adminScope) conditional.push(`Admin manages: ${form.adminScope}`);
  if (form.locationFunctionality)
    conditional.push(`Location functionality: ${form.locationFunctionality}`);
  if (form.needsBackend) conditional.push(`Backend/database needed: ${form.needsBackend}`);
  if (form.platforms.length) conditional.push(`Platforms: ${list(form.platforms)}`);
  if (form.expectedUsers) conditional.push(`Expected users: ${form.expectedUsers}`);
  if (form.modules.length) conditional.push(`Modules: ${list(form.modules)}`);

  const automationDetails = [
    form.automationTargets.length ? `Automate: ${list(form.automationTargets)}` : "",
    form.currentProcess ? `Current process: ${form.currentProcess}` : "",
    form.desiredWorkflow ? `Desired workflow: ${form.desiredWorkflow}` : "",
    form.currentTools.length ? `Tools in use: ${list(form.currentTools)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const description = [
    form.description,
    form.businessDescription ? `Business: ${form.businessDescription}` : "",
    form.mainPurpose ? `Main purpose: ${form.mainPurpose}` : "",
    form.websitePurpose ? `Website type: ${form.websitePurpose}` : "",
    form.problemStatement ? `Problem to solve: ${form.problemStatement}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const references = [form.referenceUrls, form.figmaUrl].filter(Boolean).join("\n");

  return {
    requirement_id: requirementId,
    submitted_date: submittedDate,
    customer_name: form.fullName.trim(),
    company_name: form.companyName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    country: form.country.trim(),
    communication_method: form.communicationMethod.join(", "),
    project_type: (form.projectType || "website") as ProjectType,
    project_name: form.projectName.trim(),
    description: description.slice(0, 5000),
    target_users: [form.targetAudience, form.softwareUsers].filter(Boolean).join(" | "),
    features: list(form.features),
    pages: list(form.pages),
    design_preferences: list(form.designStyles),
    technical_requirements: [form.technicalRequirements, ...conditional]
      .filter(Boolean)
      .join("\n")
      .slice(0, 3000),
    integrations: form.integrations,
    automation_details: automationDetails.slice(0, 5000),
    ai_requirements: list(form.aiRequirements),
    reference_urls: references,
    budget,
    timeline,
    deadline: form.deadline,
    file_names: list(form.fileNames),
  };
}

export const FIELD_LABELS: Record<CsvColumn, string> = {
  requirement_id: "Requirement ID",
  submitted_date: "Submitted Date",
  customer_name: "Customer Name",
  company_name: "Company",
  email: "Email",
  phone: "Phone / WhatsApp",
  country: "Country",
  communication_method: "Preferred Contact",
  project_type: "Project Type",
  project_name: "Project Name",
  description: "Description",
  target_users: "Target Users",
  features: "Features",
  pages: "Pages / Screens",
  design_preferences: "Design Preferences",
  technical_requirements: "Technical Requirements",
  integrations: "Integrations",
  automation_details: "Automation Details",
  ai_requirements: "AI Requirements",
  reference_urls: "Reference URLs",
  budget: "Budget",
  timeline: "Timeline",
  deadline: "Deadline",
  file_names: "Attached Files",
};

export function buildSummaryText(p: RequirementPayload): string {
  const lines = [
    "PROJECT REQUIREMENT SUMMARY",
    "===========================",
    "",
    ...CSV_COLUMNS.map((c) => `${FIELD_LABELS[c]}:\n${p[c] || "—"}\n`),
  ];
  return lines.join("\n");
}
