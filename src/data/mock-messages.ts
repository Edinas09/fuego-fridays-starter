/**
 * Mock message thread — a team chat channel.
 *
 * Use this if your domain is messaging, an inbox, a "Where Were We" unresolved
 * thread carousel, a "Chime In" assistant, etc. The `agent` role represents the
 * AI teammate; drive its messages with setTimeout to simulate live behavior.
 */

export type MessageRole = "user" | "teammate" | "agent";

export interface Message {
  id: string;
  role: MessageRole;
  author: string;
  avatarInitials: string;
  content: string;
  /** Minutes ago, so the thread stays "fresh" without wall-clock math. */
  minutesAgo: number;
  /** Marks a thread the agent thinks is unresolved / needs a reply. */
  unresolved?: boolean;
}

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    role: "teammate",
    author: "Priya",
    avatarInitials: "PR",
    content:
      "hey — did we ever land on a date for the launch? marketing is pinging me",
    minutesAgo: 182,
    unresolved: true,
  },
  {
    id: "msg-2",
    role: "user",
    author: "You",
    avatarInitials: "YO",
    content: "Leaning July 10 but need to confirm the demo env is stable first",
    minutesAgo: 180,
  },
  {
    id: "msg-3",
    role: "teammate",
    author: "Marcus",
    avatarInitials: "MA",
    content:
      "the export 500s from Acme are back btw. same stack trace as last week 😕",
    minutesAgo: 47,
    unresolved: true,
  },
  {
    id: "msg-4",
    role: "teammate",
    author: "Priya",
    avatarInitials: "PR",
    content: "can someone review #482 today? I'm blocked until it merges",
    minutesAgo: 33,
    unresolved: true,
  },
  {
    id: "msg-5",
    role: "agent",
    author: "Ember",
    avatarInitials: "AI",
    content:
      "I noticed three threads waiting on you: the launch date, Acme's 500s, and Priya's PR. Want me to draft replies you can approve?",
    minutesAgo: 2,
  },
  {
    id: "msg-6",
    role: "user",
    author: "You",
    avatarInitials: "YO",
    content: "start with the PR one",
    minutesAgo: 1,
  },
];

/** A couple of canned agent replies you can stream in on a timer. */
export const cannedAgentReplies: string[] = [
  "Drafted a reply to Priya: “Reviewing #482 now, will approve within the hour.” Sound right?",
  "For Acme — I pulled the last 3 occurrences of the 500. All hit the export worker at the same memory ceiling. Want the summary?",
  "On the launch date: your calendar is clear July 10 and the demo env passed its last two health checks. I can confirm to marketing on your say-so.",
];
