import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV: { label: string; to: "/" | "/about" | "/contact"; hash?: string }[] = [
  { label: "Services", to: "/", hash: "services" },
  { label: "How It Works", to: "/", hash: "how-it-works" },
  { label: "Portfolio", to: "/", hash: "portfolio" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];


export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
            <Hexagon className="size-4 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <span className="font-display text-[1.05rem] font-bold tracking-tight">
            Buildbrief
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={"hash" in item ? item.hash : undefined}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <Link to="/request">Start Your Project</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={"hash" in item ? item.hash : undefined}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-2 rounded-full">
              <Link to="/request" onClick={() => setOpen(false)}>
                Start Your Project
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
