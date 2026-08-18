# SoftWare Hub — Client Requirement Collection Website

A production-ready requirement collection platform for web development, mobile app
development, AI & automation, and custom software services.

**No database. No authentication. No admin panel.** Submissions are emailed via EmailJS and
appended to a CSV project record.

## Features
- Premium landing page (hero, services, how it works, project types, why us, FAQ, CTA, footer)
- 7-step guided requirement form with progress, validation, back/edit, and draft persistence
- Type-specific question sets (Website / Mobile App / Automation & AI / Custom Software)
- Smart conditional questions (payment gateway, chatbot scope, admin scope, location)
- "Help Me Describe My Idea" assistant that generates an editable structured draft
- File attachment validation with preview, progress, size and remove
- Unique Requirement ID (`REQ-YYYY-XXXXX`)
- CSV record, EmailJS business + customer emails, success page, downloadable summary
- Light and dark mode, fully responsive

## Tech stack
React 19 · TypeScript · Vite · TanStack Start/Router · Tailwind CSS v4 · shadcn/ui ·
EmailJS · PapaParse (CSV)

## Installation
```bash
bun install     # or npm install
bun run dev     # http://localhost:8080
```

## Environment variables
Copy `.env.example` to `.env`:
```
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=   # optional, defaults to VITE_EMAILJS_TEMPLATE_ID
VITE_BUSINESS_EMAIL=                 # your inbox for new requirement notifications
```
Values must have no trailing spaces (they are trimmed defensively in `src/services/emailService.ts`).

## EmailJS setup
1. Create a service and template at emailjs.com.
2. In the template, set the recipient to `{{to_email}}` and reply-to `{{reply_to}}`.
3. Use `{{subject}}` and `{{message}}` for the body, or the individual variables:
   `{{requirement_id}} {{customer_name}} {{customer_email}} {{customer_phone}} {{company_name}}
   {{project_type}} {{project_name}} {{description}} {{features}} {{design_preferences}}
   {{technical_requirements}} {{budget}} {{timeline}} {{reference_urls}} {{submitted_date}}`
4. Two emails are sent per submission: business notification and customer confirmation
   (distinguished by `{{email_kind}}`).

## CSV storage
Every submission is appended to `data/requirements.csv` by `POST /api/submit-requirement`.
Columns: requirement_id, submitted_date, customer_name, company_name, email, phone, country,
communication_method, project_type, project_name, description, target_users, features, pages,
design_preferences, technical_requirements, integrations, automation_details, ai_requirements,
reference_urls, budget, timeline, deadline, file_names.

Rows are written with PapaParse, so commas, quotes and newlines are escaped correctly. The
write path is a module constant — request input can never target another file.

## Backend
Single endpoint, `src/routes/api/submit-requirement.ts`:
validates with Zod, rate-limits to 5 submissions per IP per 10 minutes, appends one CSV row,
returns `{ success: true, requirementId }` or `{ success: false, message }`. Internal errors
are never leaked to the client.

## Deployment & CSV persistence
- **Persistent Node.js host (VPS, Render disk, Fly volume, Docker volume):** mount storage at
  `data/` and the CSV survives restarts. This is the recommended setup.
- **Serverless / edge hosts (Cloudflare Workers, Vercel functions):** the filesystem is
  ephemeral and read-only. The API detects this, keeps the row in memory for the instance
  lifetime, and returns `storage: "memory"`; the success page then tells the customer to keep
  their downloaded summary. In that case rely on the EmailJS notification as the record of
  truth, or mount an object-storage bucket (S3/R2) and append the same CSV row there — still
  no database required.

## Order of operations
Validate → generate Requirement ID → save CSV (must succeed) → send both emails (best effort,
failures warn but never lose the submission) → success page with download.
