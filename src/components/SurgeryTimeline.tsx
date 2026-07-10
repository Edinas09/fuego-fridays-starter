import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SURGERY_STEPS,
  ATTENTION_STATUS,
  type SurgeryStatus,
  type PatientStatus,
} from "@/data/mock-patient";
import type { Lang } from "@/components/FamilyStatusPage";

/* ── helpers ──────────────────────────────────────────────── */

const STEP_ORDER: SurgeryStatus[] = [
  "IN_PREP",
  "IN_SURGERY",
  "CLOSING",
  "RECOVERY",
  "COMPLETE",
];

function getStepState(
  stepStatus: SurgeryStatus,
  currentStatus: SurgeryStatus
): "done" | "active" | "upcoming" {
  if (currentStatus === "NEEDS_ATTENTION") return "upcoming";
  const currentIdx = STEP_ORDER.indexOf(currentStatus);
  const stepIdx = STEP_ORDER.indexOf(stepStatus);
  if (currentIdx === -1 || stepIdx === -1) return "upcoming";
  if (stepIdx < currentIdx) return "done";
  if (stepIdx === currentIdx) return "active";
  return "upcoming";
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

/* ── component ────────────────────────────────────────────── */

interface SurgeryTimelineProps {
  patient: PatientStatus;
  lang: Lang;
  className?: string;
}

export function SurgeryTimeline({ patient, lang, className }: SurgeryTimelineProps) {
  const showAttention = patient.currentStatus === "NEEDS_ATTENTION";

  const t = {
    heading:         lang === "PT" ? "Progresso da Cirurgia"  : "Surgery Progress",
    currentBadge:    lang === "PT" ? "Atual"                  : "Current",
    typicalDuration: lang === "PT" ? "Duração típica"         : "Typical duration",
  };

  return (
    <div
      className={cn("neu-raised p-6 sm:p-8", className)}
      style={{ background: "var(--neu-bg)" }}
    >
      <h2 className="text-xs font-bold uppercase tracking-widest text-[#6b7a8d]">
        {t.heading}
      </h2>

      {/* Attention banner */}
      {showAttention && (
        <div
          className="mt-4 rounded-xl px-4 py-3 text-sm font-medium text-white"
          style={{ background: "var(--neu-status-attention)" }}
        >
          <p className="font-bold">
            {lang === "PT" ? ATTENTION_STATUS.labelPT : ATTENTION_STATUS.labelEN}
          </p>
          <p className="mt-0.5 text-xs font-normal opacity-90">
            {lang === "PT" ? ATTENTION_STATUS.descriptionPT : ATTENTION_STATUS.descriptionEN}
          </p>
        </div>
      )}

      {/* Timeline */}
      <ol className="mt-6 space-y-0">
        {SURGERY_STEPS.map((step, idx) => {
          const state = getStepState(step.status, patient.currentStatus);
          const isLast = idx === SURGERY_STEPS.length - 1;
          const stepLabel = lang === "PT" ? step.labelPT : step.labelEN;
          const stepDesc  = lang === "PT" ? step.descriptionPT : step.descriptionEN;

          return (
            <li key={step.status} className="relative flex gap-4">
              {/* Connector line */}
              {!isLast && (
                <span
                  className={cn(
                    "absolute left-[19px] top-10 h-full w-0.5 -translate-x-px",
                    state === "done"
                      ? "bg-[var(--neu-status-surgery)]"
                      : "bg-[var(--neu-shadow-dark)]"
                  )}
                  aria-hidden
                />
              )}

              <StepIcon state={state} />

              <div
                className={cn("mb-6 min-w-0 flex-1 rounded-xl px-4 py-3 transition-all")}
                style={
                  state === "active"
                    ? {
                        background: "var(--neu-bg)",
                        boxShadow:
                          "4px 4px 10px var(--neu-shadow-dark), -4px -4px 10px var(--neu-shadow-light)",
                      }
                    : undefined
                }
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      state === "done"     && "text-[var(--neu-status-surgery)]",
                      state === "active"   && "text-[#2d3748]",
                      state === "upcoming" && "text-[#9aa5b4]"
                    )}
                  >
                    {stepLabel}
                  </span>
                  {state === "active" && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{ background: "var(--neu-status-surgery)" }}
                    >
                      {t.currentBadge}
                    </span>
                  )}
                </div>

                {/* Description — active and upcoming only */}
                {state !== "done" && (
                  <p
                    className={cn(
                      "mt-1 text-xs leading-relaxed",
                      state === "active" ? "text-[#57677a]" : "text-[#9aa5b4]"
                    )}
                  >
                    {stepDesc}
                  </p>
                )}

                {/* Typical duration — active only */}
                {state === "active" && step.typicalMinutes > 0 && (
                  <p className="mt-2 text-[10px] font-medium text-[#9aa5b4]">
                    {t.typicalDuration}:{" "}
                    <span className="font-bold text-[#6b7a8d]">
                      {formatDuration(step.typicalMinutes)}
                    </span>
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── StepIcon ─────────────────────────────────────────────── */

function StepIcon({ state }: { state: "done" | "active" | "upcoming" }) {
  if (state === "done") {
    return (
      <div
        className="z-10 mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: "var(--neu-status-surgery)" }}
      >
        <Check className="h-5 w-5 text-white" strokeWidth={3} />
      </div>
    );
  }

  if (state === "active") {
    return (
      <div className="relative z-10 mt-3 flex h-10 w-10 shrink-0 items-center justify-center">
        <span
          className="absolute inline-flex h-10 w-10 animate-ping rounded-full opacity-30"
          style={{ background: "var(--neu-status-surgery)" }}
        />
        <span
          className="relative flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            background: "var(--neu-bg)",
            boxShadow: "3px 3px 8px var(--neu-shadow-dark), -3px -3px 8px var(--neu-shadow-light)",
          }}
        >
          <span className="h-4 w-4 rounded-full" style={{ background: "var(--neu-status-surgery)" }} />
        </span>
      </div>
    );
  }

  return (
    <div
      className="z-10 mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      style={{
        background: "var(--neu-bg)",
        boxShadow: "inset 2px 2px 6px var(--neu-shadow-dark), inset -2px -2px 6px var(--neu-shadow-light)",
      }}
    >
      <span className="h-3 w-3 rounded-full" style={{ background: "var(--neu-shadow-dark)" }} />
    </div>
  );
}
