/**
 * Mock document — snippets of a work-in-progress report.
 *
 * Use this if your domain is writing, editing, a doc canvas, a "Correct Me If
 * I'm Wrong" chain-of-thought editor, a "Say More / Say Less" summarizer, or
 * "Just Need Your Input" shimmering uncertain passages.
 */

export interface DocBlock {
  id: string;
  type: "heading" | "paragraph" | "callout";
  text: string;
  /**
   * True when this block was drafted by the agent and is still unconfirmed —
   * render it with the shimmer treatment until the human accepts it.
   */
  uncertain?: boolean;
}

export interface MockDocument {
  title: string;
  lastEditedMinutesAgo: number;
  blocks: DocBlock[];
}

export const mockDocument: MockDocument = {
  title: "Q3 Launch Retrospective — DRAFT",
  lastEditedMinutesAgo: 12,
  blocks: [
    {
      id: "doc-1",
      type: "heading",
      text: "Summary",
    },
    {
      id: "doc-2",
      type: "paragraph",
      text: "The Q3 launch shipped on schedule and adoption exceeded our conservative estimate. Week-one activation landed at 34%, roughly 8 points above the comparable Q2 release.",
    },
    {
      id: "doc-3",
      type: "paragraph",
      text: "Early signups were driven primarily by the partner newsletter, which accounted for an estimated 60% of first-day traffic.",
      uncertain: true,
    },
    {
      id: "doc-4",
      type: "heading",
      text: "What went well",
    },
    {
      id: "doc-5",
      type: "paragraph",
      text: "The staged rollout caught two regressions before they reached the full audience. The on-call rotation reported the calmest launch week in a year.",
    },
    {
      id: "doc-6",
      type: "callout",
      text: "Open question: the export 500s reported by Acme may be related to the new worker pool. Needs confirmation before we call the launch fully clean.",
      uncertain: true,
    },
    {
      id: "doc-7",
      type: "heading",
      text: "What to improve",
    },
    {
      id: "doc-8",
      type: "paragraph",
      text: "Documentation lagged the release by three days. Two of the top five support tickets were setup questions that updated screenshots would have prevented.",
    },
  ],
};
