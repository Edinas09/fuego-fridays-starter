/**
 * Mock patient status data for the Family Status Page MVP.
 *
 * In production this would be fetched from the hospital CRM API,
 * linked to the patient barcode. All data here is fictional.
 *
 * HIPAA / LGPD compliance: only general status labels are exposed —
 * no clinical details, diagnoses, or surgical findings.
 */

export type SurgeryStatus =
  | "WAITING"
  | "IN_PREP"
  | "IN_SURGERY"
  | "CLOSING"
  | "RECOVERY"
  | "NEEDS_ATTENTION"
  | "COMPLETE";

export interface StatusStep {
  status: SurgeryStatus;
  labelPT: string;
  labelEN: string;
  descriptionPT: string;
  descriptionEN: string;
  /** Approximate minutes this phase typically takes */
  typicalMinutes: number;
}

export interface PatientStatus {
  /** Barcode / CRM identifier — never shows full name on family screen */
  patientCode: string;
  /** Display name shown to family — first name only per LGPD/HIPAA guidance */
  patientFirstName: string;
  currentStatus: SurgeryStatus;
  /** ISO timestamp of last status update */
  lastUpdatedAt: string;
  /** Name of nurse who last updated (for audit log — not shown to family) */
  lastUpdatedBy: string;
  /** Surgery start time ISO string */
  surgeryStartedAt: string;
  /** Estimated completion ISO string (optional, set by OR coordinator) */
  estimatedCompletionAt?: string;
  /** Hospital ward / OR room — general only, e.g. "Centro Cirúrgico 2" */
  location: string;
}

/** All possible steps in order — used to render the timeline */
export const SURGERY_STEPS: StatusStep[] = [
  {
    status: "IN_PREP",
    labelPT: "Preparação",
    labelEN: "Preparation",
    descriptionPT: "Seu familiar está sendo preparado para a cirurgia.",
    descriptionEN: "Your loved one is being prepared for surgery.",
    typicalMinutes: 45,
  },
  {
    status: "IN_SURGERY",
    labelPT: "Em Cirurgia",
    labelEN: "In Surgery",
    descriptionPT: "A cirurgia está em andamento. Nossa equipe está com ele(a).",
    descriptionEN: "Surgery is currently in progress. Our team is with them.",
    typicalMinutes: 240,
  },
  {
    status: "CLOSING",
    labelPT: "Fase Final",
    labelEN: "Final Phase",
    descriptionPT: "A equipe cirúrgica está na fase final do procedimento.",
    descriptionEN: "The surgical team is in the final phase of the procedure.",
    typicalMinutes: 40,
  },
  {
    status: "RECOVERY",
    labelPT: "Recuperação",
    labelEN: "Recovery",
    descriptionPT: "A cirurgia foi concluída. Seu familiar está na sala de recuperação.",
    descriptionEN: "Surgery is complete. Your loved one is now in the recovery room.",
    typicalMinutes: 60,
  },
  {
    status: "COMPLETE",
    labelPT: "Pronto para Visita",
    labelEN: "Ready for Visit",
    descriptionPT: "Seu familiar está pronto para receber visitas. Nossa equipe irá orientá-los.",
    descriptionEN: "Your loved one is ready to receive visitors. Our team will guide you.",
    typicalMinutes: 0,
  },
];

/** Special status outside the normal flow */
export const ATTENTION_STATUS: StatusStep = {
  status: "NEEDS_ATTENTION",
  labelPT: "Atenção Necessária",
  labelEN: "Needs Attention",
  descriptionPT: "Um membro da nossa equipe falará com vocês em breve.",
  descriptionEN: "A member of our care team will speak with you shortly.",
  typicalMinutes: 0,
};

/** Mock patient — currently in surgery */
export const mockPatient: PatientStatus = {
  patientCode: "HOS-2026-004821",
  patientFirstName: "Carlos",
  currentStatus: "IN_SURGERY",
  lastUpdatedAt: new Date(Date.now() - 47 * 60 * 1000).toISOString(), // 47 min ago
  lastUpdatedBy: "Enfª. Beatriz Santos",
  surgeryStartedAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(), // 2.5h ago
  estimatedCompletionAt: new Date(Date.now() + 1.5 * 60 * 60 * 1000).toISOString(), // 1.5h from now
  location: "Centro Cirúrgico 2",
};
