import { createFileRoute } from "@tanstack/react-router";
import { requirementPayloadSchema } from "@/lib/requirement";
import { appendRequirement } from "@/lib/csv-store.server";

/** Very small in-memory rate limiter: 5 submissions per IP per 10 minutes. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export const Route = createFileRoute("/api/submit-requirement")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "unknown";

        if (rateLimited(ip)) {
          return json(
            { success: false, message: "Too many submissions. Please try again later." },
            429,
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ success: false, message: "Invalid request." }, 400);
        }

        const parsed = requirementPayloadSchema.safeParse(body);
        if (!parsed.success) {
          return json(
            { success: false, message: "Some required details are missing or invalid." },
            400,
          );
        }

        try {
          const result = await appendRequirement(parsed.data);
          if (!result.ok) throw new Error("store failed");
          return json({
            success: true,
            requirementId: parsed.data.requirement_id,
            storage: result.persisted,
          });
        } catch {
          return json({ success: false, message: "Unable to save requirement" }, 500);
        }
      },
    },
  },
});
