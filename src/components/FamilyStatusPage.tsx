import { useState } from "react";
import { Heart } from "lucide-react";
import { mockPatient } from "@/data/mock-patient";
import { PatientStatusCard } from "@/components/PatientStatusCard";
import { SurgeryTimeline } from "@/components/SurgeryTimeline";
import { TalkToMe } from "@/components/TalkToMe";

export type Lang = "PT" | "EN";

/* ── language selector ────────────────────────────────────── */

function LanguageSelector({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <div
      className="flex items-center gap-1 rounded-full p-1"
      style={{
        background: "var(--neu-bg)",
        boxShadow:
          "inset 3px 3px 7px var(--neu-shadow-dark), inset -3px -3px 7px var(--neu-shadow-light)",
      }}
      role="group"
      aria-label="Select language"
    >
      {(["PT", "EN"] as Lang[]).map((option) => {
        const active = lang === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all"
            style={
              active
                ? {
                    background: "var(--neu-status-surgery)",
                    color: "#ffffff",
                    boxShadow:
                      "inset 2px 2px 5px rgba(0,0,0,0.2)",
                  }
                : {
                    background: "transparent",
                    color: "#6b7a8d",
                  }
            }
          >
            <span>{option === "PT" ? "🇧🇷" : "🇺🇸"}</span>
            <span>{option === "PT" ? "Português" : "English"}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────── */

export function FamilyStatusPage() {
  const [lang, setLang] = useState<Lang>("PT");

  const t = {
    portalTitle:  lang === "PT" ? "Portal da Família"               : "Family Portal",
    portalSub:    lang === "PT" ? "Centro Oncológico · Sala de Espera" : "Oncology Center · Waiting Room",
    infoTitle:    lang === "PT" ? "Informação importante:"           : "Important:",
    infoBody:     lang === "PT"
      ? "As atualizações são enviadas pela equipe de enfermagem. Por privacidade e segurança do paciente (LGPD / HIPAA), apenas informações gerais de status são exibidas aqui. Em caso de dúvidas, procure nossa equipe na recepção."
      : "Updates are sent by the nursing team. For patient privacy and security (LGPD / HIPAA), only general status information is displayed here. If you have questions, please speak with our team at the reception desk.",
    footer:       lang === "PT"
      ? "Estamos aqui com você · Este portal é atualizado em tempo real pela equipe"
      : "We are here with you · This portal is updated in real time by the care team",
  };

  return (
    <div className="min-h-dvh" style={{ background: "var(--neu-bg)" }}>

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-20 px-4 py-3 sm:px-6"
        style={{
          background: "var(--neu-bg)",
          boxShadow: "0 2px 12px var(--neu-shadow-dark)",
        }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                background: "var(--neu-bg)",
                boxShadow:
                  "3px 3px 8px var(--neu-shadow-dark), -3px -3px 8px var(--neu-shadow-light)",
              }}
            >
              <Heart className="h-4 w-4 fill-[var(--neu-status-attention)] text-[var(--neu-status-attention)]" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight text-[#2d3748]">{t.portalTitle}</p>
              <p className="text-[10px] text-[#9aa5b4]">{t.portalSub}</p>
            </div>
          </div>

          <LanguageSelector lang={lang} onChange={setLang} />
        </div>
      </header>

      {/* ── Main ── */}
      <main className="mx-auto max-w-2xl space-y-5 px-4 py-6 pb-24 sm:px-6">

        <PatientStatusCard patient={mockPatient} lang={lang} />

        <SurgeryTimeline patient={mockPatient} lang={lang} />

        {/* Privacy info note */}
        <div
          className="rounded-xl px-4 py-3 text-xs leading-relaxed text-[#6b7a8d]"
          style={{
            background: "var(--neu-bg)",
            boxShadow:
              "inset 2px 2px 6px var(--neu-shadow-dark), inset -2px -2px 6px var(--neu-shadow-light)",
          }}
        >
          <span className="font-semibold text-[#57677a]">{t.infoTitle}</span>{" "}
          {t.infoBody}
        </div>

        <TalkToMe defaultOpen lang={lang} />

      </main>

      {/* ── Footer ── */}
      <footer
        className="fixed bottom-0 left-0 right-0 px-4 py-3 text-center text-[10px] text-[#9aa5b4]"
        style={{
          background: "var(--neu-bg)",
          boxShadow: "0 -2px 10px var(--neu-shadow-dark)",
        }}
      >
        {t.footer}
      </footer>
    </div>
  );
}
