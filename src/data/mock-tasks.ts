/**
 * Mock task/todo items — a generic work backlog.
 *
 * Use this if your domain is task management, a to-do app, a sprint board,
 * a "Now's A Great Time To..." backlog surface, etc. All data is fake and
 * lives entirely in the front end.
 */

export type TaskStatus = "todo" | "in_progress" | "blocked" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string; // ISO date
  tags: string[];
  /** Set by the "agent" in some patterns — flags a task the AI noticed. */
  aiSuggested?: boolean;
}

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Draft Q3 launch announcement",
    description:
      "First pass at the blog post + social copy for the July launch. Marketing needs a review draft by EOW.",
    status: "in_progress",
    priority: "high",
    assignee: "You",
    dueDate: "2026-07-09",
    tags: ["writing", "launch"],
  },
  {
    id: "task-2",
    title: "Review PR #482 — auth refactor",
    description:
      "Teammate is blocked waiting on your review. Touches the session handling you wrote last month.",
    status: "todo",
    priority: "urgent",
    assignee: "You",
    dueDate: "2026-07-07",
    tags: ["code-review", "blocking-someone"],
  },
  {
    id: "task-3",
    title: "Reconcile analytics dashboard numbers",
    description:
      "The signups metric on the exec dashboard doesn't match the raw events table. Find the discrepancy.",
    status: "blocked",
    priority: "medium",
    assignee: "You",
    dueDate: "2026-07-11",
    tags: ["data", "investigate"],
  },
  {
    id: "task-4",
    title: "Prep 1:1 agenda with manager",
    description: "Jot down wins, blockers, and the promo conversation to open.",
    status: "todo",
    priority: "low",
    assignee: "You",
    dueDate: "2026-07-08",
    tags: ["planning"],
  },
  {
    id: "task-5",
    title: "Update onboarding doc screenshots",
    description:
      "The setup screenshots are three versions out of date. New hire starts Monday.",
    status: "todo",
    priority: "medium",
    assignee: "You",
    dueDate: "2026-07-10",
    tags: ["docs", "onboarding"],
  },
  {
    id: "task-6",
    title: "Archive the deprecated staging environment",
    description:
      "Nobody's touched staging-legacy in 40 days. Costs are adding up — worth tearing down.",
    status: "todo",
    priority: "low",
    assignee: "You",
    dueDate: "2026-07-15",
    tags: ["infra", "cleanup"],
    aiSuggested: true,
  },
  {
    id: "task-7",
    title: "Respond to customer escalation (Acme Co.)",
    description:
      "Acme reported intermittent 500s on export. Support looped you in yesterday.",
    status: "in_progress",
    priority: "urgent",
    assignee: "You",
    dueDate: "2026-07-07",
    tags: ["support", "escalation"],
  },
  {
    id: "task-8",
    title: "Finalize offsite lunch order",
    description: "Collect dietary restrictions and place the catering order.",
    status: "done",
    priority: "low",
    assignee: "You",
    dueDate: "2026-07-06",
    tags: ["team"],
  },
];
