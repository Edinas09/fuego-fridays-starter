/**
 * Mock calendar events — meetings and deadlines for a workday.
 *
 * Use this if your domain is scheduling, a day-planner, a "Now's A Great Time
 * To..." idle-slot finder, or a "Got A Sec?" agent that leans in between
 * meetings. Times are relative to a nominal 9-to-5 day so the layout is stable.
 */

export type EventKind = "meeting" | "focus" | "deadline" | "break";

export interface CalendarEvent {
  id: string;
  title: string;
  kind: EventKind;
  /** 24h start/end in minutes from midnight — easy to lay out on a timeline. */
  startMinutes: number;
  endMinutes: number;
  attendees?: string[];
  /** A gap the agent could offer to fill ("Now's A Great Time To..."). */
  openSlot?: boolean;
}

/** Helper: "9:30" -> minutes from midnight. */
const t = (h: number, m = 0) => h * 60 + m;

export const mockCalendar: CalendarEvent[] = [
  {
    id: "cal-1",
    title: "Standup",
    kind: "meeting",
    startMinutes: t(9, 0),
    endMinutes: t(9, 15),
    attendees: ["You", "Priya", "Marcus", "Dana"],
  },
  {
    id: "cal-2",
    title: "Open — no meetings",
    kind: "focus",
    startMinutes: t(9, 15),
    endMinutes: t(11, 0),
    openSlot: true,
  },
  {
    id: "cal-3",
    title: "Launch sync w/ Marketing",
    kind: "meeting",
    startMinutes: t(11, 0),
    endMinutes: t(11, 30),
    attendees: ["You", "Marketing", "Priya"],
  },
  {
    id: "cal-4",
    title: "Lunch",
    kind: "break",
    startMinutes: t(12, 0),
    endMinutes: t(13, 0),
  },
  {
    id: "cal-5",
    title: "Acme escalation — respond by",
    kind: "deadline",
    startMinutes: t(14, 0),
    endMinutes: t(14, 0),
  },
  {
    id: "cal-6",
    title: "Open — no meetings",
    kind: "focus",
    startMinutes: t(14, 0),
    endMinutes: t(16, 0),
    openSlot: true,
  },
  {
    id: "cal-7",
    title: "1:1 with manager",
    kind: "meeting",
    startMinutes: t(16, 0),
    endMinutes: t(16, 30),
    attendees: ["You", "Manager"],
  },
];

/** Format a minutes-from-midnight value as a human label, e.g. 570 -> "9:30 AM". */
export function formatTime(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}
