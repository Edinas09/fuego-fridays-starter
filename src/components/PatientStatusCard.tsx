import { Clock, MapPin, RefreshCw, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PatientStatus, SurgeryStatus } from "@/data/mock-patient";
import type { Lang } from "@/components/FamilyStatusPage";

/* ── helpers ──────────────────────────────────────────────── */

function formatRelativeTime(iso: string, lang: Lang): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return lang === "PT" ? "agora mesmo" : "just now";
  if (mins < 60) return lang === "PT" ? `${mins} min atrás` : `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (lang === "PT") return rem > 0 ? `${hrs}h ${rem}min atrás` : `${hrs}h atrás`;
  return rem > 0 ? `${hrs}h ${rem}min ago` : `${hrs}h ago`;
}

function formatDuration(startIso: string): string {
  const mins = Math.floor((Date.now() - new Date(startIso).getTime()) / 60_000);
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (hrs === 0) return `${mins} min`;
  return rem > 0 ? `${hrs}h ${rem}min` : `${hrs}h`;
}

function formatEstimated(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* ── status config ────────────────────────────────────────── */

const STATUS_CONFIG: Record<
  SurgeryStatus,
  { labelPT: string; labelEN: string; color: string; textColor: string; pulse: boolean }
> = {
  WAITING:          { labelPT: "Aguardando",        labelEN: "Waiting",         color: "var(--neu-status-waiting)",   textColor: "#fff", pulse: false },
  IN_PREP:          { labelPT: "Preparação",         labelEN: "Preparation",     color: "var(--neu-status-prep)",      textColor: "#fff", pulse: true  },
  IN_SURGERY:       { labelPT: "Em Cirurgia",        labelEN: "In Surgery",      color: "var(--neu-status-surgery)",   textColor: "#fff", pulse: true  },
  CLOSING:          { labelPT: "Fase Final",         labelEN: "Final Phase",     color: "var(--neu-status-closing)",   textColor: "#fff", pulse: true  },
  RECOVERY:         { labelPT: "Recuperação",        labelEN: "Recovery",        color: "var(--neu-status-recovery)",  textColor: "#fff", pulse: false },
  NEEDS_ATTENTION:  { labelPT: "Atenção Necessária", labelEN: "Needs Attention", color: "var(--neu-status-attention)", textColor: "#fff", pulse: true  },
  COMPLETE:         { labelPT: "Pronto para Visita", labelEN: "Ready for Visit", color: "var(--neu-status-complete)",  textColor: "#fff", pulse: false },
};

/* ── component ────────────────────────────────────────────── */

interface PatientStatusCardProps {
  patient: PatientStatus;
  lang: Lang;
  className?: string;
}

export function PatientStatusCard({ patient, lang, className }: PatientStatusCardProps) {
  const cfg = STATUS_CONFIG[patient.currentStatus];
  const label = lang === "PT" ? cfg.labelPT : cfg.labelEN;

  const t = {
    badge:        lang === "PT" ? "Hospital · Sala de Espera"  : "Hospital · Waiting Room",
    code:         lang === "PT" ? "Código"                     : "Code",
    inSurgeryFor: lang === "PT" ? "Em cirurgia há"             : "In surgery for",
    lastUpdate:   lang === "PT" ? "Última atualização"         : "Last update",
    location:     lang === "PT" ? "Local"                      : "Location",
    estimated:    lang === "PT" ? "Previsão de término"        : "Estimated completion",
    approximate:  lang === "PT" ? "(aproximado)"               : "(approximate)",
    reassurance:  lang === "PT"
      ? `Nossa equipe está com ${patient.patientFirstName} a cada momento.`
      : `Our team is with ${patient.patientFirstName} every step of the way.`,
  };

  return (
    <div
      className={cn("neu-raised p-6 sm:p-8", className)}
      style={{ background: "var(--neu-bg)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--neu-status-surgery)] opacity-80">
            {t.badge}
          </span>
          <h1 className="mt-1 text-3xl font-bold leading-tight text-[#2d3748] sm:text-4xl">
            {patient.patientFirstName}
          </h1>
          <p className="mt-0.5 text-sm text-[#57677a]">
            {t.code}:{" "}
            <span className="font-mono font-medium">{patient.patientCode}</span>
          </p>
        </div>
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          style={{
            background: "var(--neu-bg)",
            boxShadow: "4px 4px 10px var(--neu-shadow-dark), -4px -4px 10px var(--neu-shadow-light)",
          }}
        >
          <Heart className="h-6 w-6 fill-[var(--neu-status-attention)] text-[var(--neu-status-attention)]" />
        </div>
      </div>

      {/* Status pill */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative flex items-center gap-2.5">
          {cfg.pulse && (
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
              style={{ background: cfg.color }}
            />
          )}
          <span
            className="relative inline-flex h-3 w-3 rounded-full"
            style={{ background: cfg.color }}
          />
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold tracking-wide"
          style={{ background: cfg.color, color: cfg.textColor }}
        >
          {label}
        </span>
      </div>

      {/* Status description */}
      <StatusDescription status={patient.currentStatus} lang={lang} />

      {/* Meta chips */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetaChip
          icon={<Clock className="h-4 w-4" />}
          label={t.inSurgeryFor}
          value={formatDuration(patient.surgeryStartedAt)}
        />
        <MetaChip
          icon={<RefreshCw className="h-4 w-4" />}
          label={t.lastUpdate}
          value={formatRelativeTime(patient.lastUpdatedAt, lang)}
        />
        <MetaChip
          icon={<MapPin className="h-4 w-4" />}
          label={t.location}
          value={patient.location}
        />
      </div>

      {/* Estimated completion */}
      {patient.estimatedCompletionAt && (
        <div
          className="mt-4 rounded-xl px-4 py-3 text-sm text-[#2d3748]"
          style={{
            boxShadow: "inset 3px 3px 8px var(--neu-shadow-dark), inset -3px -3px 8px var(--neu-shadow-light)",
            background: "var(--neu-bg)",
          }}
        >
          <span className="font-medium">{t.estimated}:</span>{" "}
          <span className="font-bold text-[var(--neu-status-surgery)]">
            {formatEstimated(patient.estimatedCompletionAt)}
          </span>
          <span className="ml-1 text-xs text-[#57677a]">{t.approximate}</span>
        </div>
      )}

      {/* Reassurance */}
      <p className="mt-5 text-center text-xs leading-relaxed text-[#6b7a8d]">
        {t.reassurance}
      </p>
    </div>
  );
}

/* ── sub-components ───────────────────────────────────────── */

function StatusDescription({ status, lang }: { status: SurgeryStatus; lang: Lang }) {
  const descriptions: Record<SurgeryStatus, { pt: string; en: string }> = {
    WAITING:         { pt: "Aguardando início do procedimento.",                                                                 en: "Waiting for the procedure to begin." },
    IN_PREP:         { pt: "Seu familiar está sendo preparado para a cirurgia. A equipe está tomando todos os cuidados.",       en: "Your loved one is being prepared for surgery. The team is taking every care." },
    IN_SURGERY:      { pt: "A cirurgia está em andamento. Nossa equipe especializada está totalmente focada no seu familiar.",   en: "Surgery is currently in progress. Our specialist team is fully focused on your loved one." },
    CLOSING:         { pt: "A equipe cirúrgica está na fase final do procedimento. Estamos quase lá.",                          en: "The surgical team is in the final phase of the procedure. Almost there." },
    RECOVERY:        { pt: "A cirurgia foi concluída. Seu familiar está agora na sala de recuperação sob cuidados.",            en: "Surgery has been completed. Your loved one is now in the recovery room receiving care." },
    NEEDS_ATTENTION: { pt: "Um membro da nossa equipe de saúde falará com vocês pessoalmente em breve.",                        en: "A member of our healthcare team will speak with you in person shortly." },
    COMPLETE:        { pt: "Tudo correu bem. Seu familiar está pronto para receber visitas. Nossa equipe irá orientá-los.",     en: "Everything went well. Your loved one is ready to receive visitors. Our team will guide you." },
  };

  const text = lang === "PT" ? descriptions[status].pt : descriptions[status].en;

  return (
    <p className="mt-4 text-base font-medium leading-relaxed text-[#2d3748]">
      {text}
    </p>
  );
}

function MetaChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
      style={{
        background: "var(--neu-bg)",
        boxShadow: "inset 2px 2px 6px var(--neu-shadow-dark), inset -2px -2px 6px var(--neu-shadow-light)",
      }}
    >
      <span className="shrink-0 text-[var(--neu-status-surgery)]">{icon}</span>
      <div className="min-w-0">
        <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-[#6b7a8d]">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-[#2d3748]">{value}</p>
      </div>
    </div>
  );
}
