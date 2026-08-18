import { useCallback, useRef, useState } from "react";
import { FileText, ImageIcon, Trash2, Upload, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

const ALLOWED = [
  ".png",
  ".jpg",
  ".jpeg",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".zip",
] as const;

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB per file
const MAX_FILES = 8;

export type UploadedFile = {
  id: string;
  name: string;
  size: number;
  preview: string | null;
  progress: number;
  error: string | null;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extOf(name: string) {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
}

export function FileUpload({
  files,
  onChange,
}: {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const incoming = Array.from(list).slice(0, MAX_FILES - files.length);
      const next: UploadedFile[] = [];

      for (const file of incoming) {
        const id = `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`;
        const ext = extOf(file.name);
        let error: string | null = null;
        if (!(ALLOWED as readonly string[]).includes(ext)) {
          error = "Unsupported file type";
        } else if (file.size > MAX_BYTES) {
          error = "File is larger than 10 MB";
        }

        const entry: UploadedFile = {
          id,
          name: file.name,
          size: file.size,
          preview: null,
          progress: error ? 0 : 100,
          error,
        };
        next.push(entry);

        if (!error && /\.(png|jpe?g)$/i.test(file.name)) {
          entry.progress = 5;
          const reader = new FileReader();
          reader.onprogress = (e) => {
            if (e.lengthComputable) {
              const pct = Math.round((e.loaded / e.total) * 100);
              onChange(
                [...files, ...next].map((f) => (f.id === id ? { ...f, progress: pct } : f)),
              );
            }
          };
          reader.onload = () => {
            onChange(
              [...files, ...next].map((f) =>
                f.id === id
                  ? { ...f, preview: String(reader.result), progress: 100 }
                  : f,
              ),
            );
          };
          reader.onerror = () => {
            onChange(
              [...files, ...next].map((f) =>
                f.id === id ? { ...f, error: "Could not read file", progress: 0 } : f,
              ),
            );
          };
          reader.readAsDataURL(file);
        }
      }

      onChange([...files, ...next]);
      if (inputRef.current) inputRef.current.value = "";
    },
    [files, onChange],
  );

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">References &amp; attachments</Label>
      <p className="text-xs text-muted-foreground">
        Screenshots, requirement documents, Figma exports, brand guidelines, product images or
        workflow diagrams. PNG, JPG, PDF, DOC, XLS or ZIP — up to 10 MB each. File names are
        included in your brief; we&apos;ll request the files themselves when we follow up.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          dragging ? "border-primary bg-accent/60" : "border-border bg-card"
        }`}
      >
        <Upload className="mx-auto size-6 text-muted-foreground" />
        <p className="mt-3 text-sm font-medium">Drag &amp; drop files here</p>
        <p className="mt-1 text-xs text-muted-foreground">
          or select them from your device ({files.length}/{MAX_FILES})
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4 rounded-full"
          onClick={() => inputRef.current?.click()}
          disabled={files.length >= MAX_FILES}
        >
          Choose files
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALLOWED.join(",")}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                f.error ? "border-destructive/50 bg-destructive/5" : "border-border bg-card"
              }`}
            >
              {f.preview ? (
                <img
                  src={f.preview}
                  alt={`Preview of ${f.name}`}
                  className="size-11 rounded-lg object-cover"
                />
              ) : (
                <span className="grid size-11 place-items-center rounded-lg bg-secondary text-muted-foreground">
                  {f.error ? (
                    <AlertCircle className="size-5 text-destructive" />
                  ) : /\.(png|jpe?g)$/i.test(f.name) ? (
                    <ImageIcon className="size-5" />
                  ) : (
                    <FileText className="size-5" />
                  )}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{f.name}</p>
                <p className="text-xs text-muted-foreground">
                  {f.error ? f.error : formatSize(f.size)}
                </p>
                {!f.error && f.progress < 100 && (
                  <Progress value={f.progress} className="mt-2 h-1.5" />
                )}
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`Remove ${f.name}`}
                onClick={() => onChange(files.filter((x) => x.id !== f.id))}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
