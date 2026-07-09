import { useState } from "react";

import { ArrowUpRight, Check, Copy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Copy-and-paste starter prompts for Kiro's chat. */
const PROMPTS = [
  "What is humorphism? Show me a few patterns I could build.",
  "What's already in this project that I can build with?",
  "What do you already know about this workshop?",
  "I do ___ at work. Suggest a humorphic pattern and build a first version.",
  "Build the 'Just Need Your Input' pattern for ___.",
  "Replace this landing page with a chat screen that uses the mock data.",
];

/**
 * Fuego Fridays — starter landing / launch pad.
 *
 * This is intentionally NOT a demo of humorphism. When the app boots, the goal
 * of this screen is simple: confirm the environment works, show what's in the
 * box to build with, and push you into Kiro to start. Pick a pattern from
 * humorphism.com, pick your own work domain, and build it here.
 *
 * The shadcn/ui components (including the chat kit) live in src/components/ui
 * ready to import. Mock data is in src/data. Replace this screen with your build.
 */

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {/* Masthead — full-bleed, pinned to the window edges */}
      <header className="border-b border-border/60">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-3 items-center px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3 justify-self-start">
            <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
              Fuego Fridays
            </span>
            <Badge
              variant="outline"
              className="rounded-full border-border text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
            >
              starter
            </Badge>
          </div>
          <span className="hidden items-center gap-1.5 justify-self-center whitespace-nowrap rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground md:inline-flex">
            <Check className="h-3.5 w-3.5 text-fuego-500" />
            You&rsquo;re live &middot; localhost is running
          </span>
          <a
            href="https://humorphism.com"
            target="_blank"
            rel="noreferrer"
            className="justify-self-end text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            humorphism.com
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-24 sm:px-8">
        {/* Hero — full-width rounded white panel */}
        <section className="mt-8 w-full rounded-3xl border border-border/60 bg-card p-8 shadow-sm sm:mt-12 sm:p-12 lg:p-16">
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Build a front-end for an AI teammate.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground sm:text-xl">
            Pick one humorphic pattern. Build it into an experience that&rsquo;s
            relevant to you, personally or at work.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://humorphism.com/foundations/notice"
              target="_blank"
              rel="noreferrer"
              className={cn(
                "bg-thermal inline-flex items-center gap-1.5 rounded-md px-4 py-2.5",
                "text-sm font-bold text-white shadow-sm",
                "transition-all hover:-translate-y-0.5 hover:brightness-105",
              )}
            >
              Browse humorphic patterns
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="inline-flex items-center rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground">
              The pattern is the constraint. The domain is yours.
            </span>
          </div>
        </section>

        {/* Start with Kiro — the page's one job: get you into the chat.
            Horizontal padding matches the hero card so this content aligns
            with the hero text above. */}
        <section className="mt-20 px-8 sm:px-12 lg:px-16">
          <SectionLabel>Start with Kiro</SectionLabel>
          <p className="mt-4 text-lg leading-relaxed text-foreground sm:text-xl">
            In your Kiro IDE, everything you need to start building is already
            set up. This page, the localhost preview you&rsquo;re looking at now,
            is what you&rsquo;ll change, and Kiro can help you do it. Open
            Kiro&rsquo;s chat (<Kbd>⌘</Kbd>
            <Kbd>L</Kbd> on Mac, <Kbd>Ctrl</Kbd>
            <Kbd>L</Kbd> on Windows), tap a prompt to copy it, and paste it in.
          </p>

          <div className="mt-14">
            <PromptGroup
              label="Suggested prompts to get started"
              prompts={PROMPTS}
            />
          </div>
        </section>

        {/* Vision tip */}
        <section className="mt-10 px-8 sm:px-12 lg:px-16">
          <div className="rounded-lg border border-fuego-500/25 bg-fuego-500/[0.05] p-5">
            <p className="font-display text-lg font-semibold">
              Show Kiro what you mean. Give it your eyes
            </p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Kiro&rsquo;s chat accepts images, so you can show it instead of
              describing it. Paste or drag in a screenshot and say &ldquo;build
              this.&rdquo; It works just as well for changes: screenshot what
              Kiro builds on your localhost, point out what&rsquo;s off, and tell
              it what to fix. A picture is faster than words for a UI.
            </p>
          </div>
        </section>

      </main>

      {/* Footer — full-bleed, pinned to the bottom edge */}
      <footer className="mt-16 border-t border-border/60">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:px-8">
          <span>React 19 · TypeScript · Vite · Tailwind · shadcn/ui</span>
          <span>No backend. Mock everything. The UX is the deliverable.</span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </h2>
  );
}

function PromptGroup({
  label,
  prompts,
}: {
  label: string;
  prompts: string[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </h3>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {prompts.map((prompt) => (
          <PromptRow key={prompt} text={prompt} />
        ))}
      </ul>
    </div>
  );
}

/** A single tappable prompt row that copies its text to the clipboard. */
function PromptRow({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be blocked; fail quietly.
    }
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleCopy}
        className="group flex w-full items-center justify-between gap-4 py-3.5 text-left"
        aria-label={`Copy prompt: ${text}`}
      >
        <span className="text-lg leading-relaxed text-foreground sm:text-xl">
          {text}
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1.5 text-xs font-medium transition-colors",
            copied
              ? "text-fuego-600"
              : "text-muted-foreground group-hover:text-foreground",
          )}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
    </li>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mx-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-secondary px-1 font-sans text-[11px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}
