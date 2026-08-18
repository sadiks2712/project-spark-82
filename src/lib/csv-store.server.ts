import Papa from "papaparse";
import { CSV_COLUMNS, type RequirementPayload } from "./requirement";

/**
 * CSV persistence.
 *
 * The single allowed write target is `data/requirements.csv` — the path is a
 * module constant and is never derived from request input.
 *
 * On a persistent Node.js host the file is appended to on disk. On serverless
 * / read-only hosts (Cloudflare Workers, Vercel functions, ...) the filesystem
 * is ephemeral, so we fall back to an in-process buffer and report
 * `persisted: "memory"` so the caller can warn appropriately. See README for
 * the recommended persistent-storage setup.
 */
const CSV_RELATIVE_PATH = "data/requirements.csv";

const memoryRows: string[] = [];

export type StoreResult = { ok: true; persisted: "disk" | "memory" } | { ok: false };

function toRow(payload: RequirementPayload): string[] {
  return CSV_COLUMNS.map((c) => String(payload[c] ?? ""));
}

export function headerLine(): string {
  return Papa.unparse([CSV_COLUMNS as unknown as string[]], { newline: "\n" }) + "\n";
}

export function rowLine(payload: RequirementPayload): string {
  return Papa.unparse([toRow(payload)], { newline: "\n" }) + "\n";
}

export async function appendRequirement(payload: RequirementPayload): Promise<StoreResult> {
  const line = rowLine(payload);
  try {
    const [{ appendFile, mkdir, stat }, path] = await Promise.all([
      import("node:fs/promises"),
      import("node:path"),
    ]);
    const file = path.resolve(process.cwd(), CSV_RELATIVE_PATH);
    await mkdir(path.dirname(file), { recursive: true });
    let exists = true;
    try {
      const s = await stat(file);
      exists = s.size > 0;
    } catch {
      exists = false;
    }
    await appendFile(file, (exists ? "" : headerLine()) + line, "utf8");
    memoryRows.push(line);
    return { ok: true, persisted: "disk" };
  } catch {
    // Ephemeral / read-only filesystem — keep the row in memory for export.
    memoryRows.push(line);
    return { ok: true, persisted: "memory" };
  }
}

export function exportCsv(): string {
  return headerLine() + memoryRows.join("");
}
