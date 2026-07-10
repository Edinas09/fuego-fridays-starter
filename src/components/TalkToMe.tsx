import { useState, useRef, useEffect } from "react";
import { Send, HeartHandshake, ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockTalkToMeMessages,
  cannedAgentResponses,
  cannedAgentResponsesPT,
  type TalkToMeMessage,
} from "@/data/mock-talktome";
import type { Lang } from "@/components/FamilyStatusPage";

/* ── typing indicator ─────────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <AgentAvatar />
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3"
        style={{ background: "var(--neu-chat-agent-bubble)" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-bounce rounded-full"
            style={{ background: "var(--neu-status-surgery)", animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── avatars ──────────────────────────────────────────────── */

function AgentAvatar() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
      style={{
        background: "var(--neu-bg)",
        boxShadow: "2px 2px 6px var(--neu-shadow-dark), -2px -2px 6px var(--neu-shadow-light)",
      }}
    >
      <HeartHandshake className="h-4 w-4 text-[var(--neu-status-surgery)]" />
    </div>
  );
}

function FamilyAvatar() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ background: "var(--neu-status-surgery)" }}
    >
      F
    </div>
  );
}

/* ── message bubble ───────────────────────────────────────── */

function ChatBubble({ message, lang }: { message: TalkToMeMessage; lang: Lang }) {
  const isAgent = message.role === "agent";
  const text = isAgent
    ? (lang === "PT" ? message.contentPT : message.content)
    : message.content;

  const supportLabel = lang === "PT"
    ? "Suporte presencial disponível"
    : "In-person support available";

  return (
    <div className={cn("flex items-end gap-2", !isAgent && "flex-row-reverse")}>
      {isAgent ? <AgentAvatar /> : <FamilyAvatar />}

      <div className="flex max-w-[78%] flex-col gap-1">
        {message.flaggedForSupport && (
          <div
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white"
            style={{ background: "var(--neu-status-attention)" }}
          >
            <AlertCircle className="h-3 w-3 shrink-0" />
            {supportLabel}
          </div>
        )}

        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isAgent ? "rounded-bl-sm text-[#2d3748]" : "rounded-br-sm text-white"
          )}
          style={
            isAgent
              ? { background: "var(--neu-chat-agent-bubble)" }
              : { background: "var(--neu-chat-user-bubble)" }
          }
        >
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

/* ── support nudge ────────────────────────────────────────── */

function SupportNudge({ lang }: { lang: Lang }) {
  const t = {
    title: lang === "PT" ? "Psicóloga disponível"                                              : "Psychologist available",
    body:  lang === "PT" ? "Nossa psicóloga está no Balcão de Apoio da Sala de Espera."        : "Our on-site psychologist is at the Waiting Room Support Desk.",
  };

  return (
    <div
      className="mx-4 mb-2 flex items-start gap-2.5 rounded-xl p-3 text-xs"
      style={{
        background: "var(--neu-bg)",
        boxShadow: "inset 2px 2px 5px var(--neu-shadow-dark), inset -2px -2px 5px var(--neu-shadow-light)",
      }}
    >
      <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-[var(--neu-status-surgery)]" />
      <p className="leading-relaxed text-[#57677a]">
        <span className="font-semibold text-[#2d3748]">{t.title}</span>
        <br />
        {t.body}
      </p>
    </div>
  );
}

/* ── main component ───────────────────────────────────────── */

interface TalkToMeProps {
  defaultOpen?: boolean;
  lang: Lang;
}

export function TalkToMe({ defaultOpen = true, lang }: TalkToMeProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<TalkToMeMessage[]>(mockTalkToMeMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);
  const [showSupportNudge, setShowSupportNudge] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const familyMessageCount = messages.filter((m) => m.role === "family").length;
  useEffect(() => {
    if (familyMessageCount >= 3) setShowSupportNudge(true);
  }, [familyMessageCount]);

  const t = {
    subtitle:    lang === "PT" ? "Apoio emocional"                              : "Emotional support",
    disclaimer:  lang === "PT"
      ? "Este assistente foi treinado com sensibilidade psicológica para oferecer suporte durante períodos de espera. Não substitui atendimento clínico."
      : "This assistant is trained with psychological sensitivity to provide support during waiting periods. It does not replace clinical care.",
    disclaimerTitle: lang === "PT" ? "Habilidade Psicóloga" : "Psychologist Skill",
    placeholder: lang === "PT" ? "Como você está se sentindo?"  : "How are you feeling?",
    ariaClose:   lang === "PT" ? "Fechar TalkToMe"              : "Close TalkToMe",
    ariaOpen:    lang === "PT" ? "Abrir TalkToMe"               : "Open TalkToMe",
    ariaSend:    lang === "PT" ? "Enviar mensagem"              : "Send message",
    ariaInput:   lang === "PT" ? "Mensagem para TalkToMe"       : "Message to TalkToMe",
  };

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    const familyMsg: TalkToMeMessage = {
      id: `ttm-${Date.now()}`,
      role: "family",
      content: text,
      contentPT: text,
      minutesAgo: 0,
    };
    setMessages((prev) => [...prev, familyMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 1200 + Math.random() * 1200;
    setTimeout(() => {
      setIsTyping(false);
      const shouldFlag = (replyIndex + 1) % 3 === 0;
      const agentMsg: TalkToMeMessage = {
        id: `ttm-agent-${Date.now()}`,
        role: "agent",
        content: cannedAgentResponses[replyIndex % cannedAgentResponses.length],
        contentPT: cannedAgentResponsesPT[replyIndex % cannedAgentResponsesPT.length],
        minutesAgo: 0,
        flaggedForSupport: shouldFlag,
      };
      setMessages((prev) => [...prev, agentMsg]);
      setReplyIndex((i) => i + 1);
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        background: "var(--neu-bg)",
        borderRadius: "1rem",
        boxShadow: "6px 6px 14px var(--neu-shadow-dark), -6px -6px 14px var(--neu-shadow-light)",
      }}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-opacity hover:opacity-80"
        aria-expanded={isOpen}
        aria-label={isOpen ? t.ariaClose : t.ariaOpen}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: "var(--neu-bg)",
              boxShadow: "3px 3px 8px var(--neu-shadow-dark), -3px -3px 8px var(--neu-shadow-light)",
            }}
          >
            <HeartHandshake className="h-4 w-4 text-[var(--neu-status-surgery)]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#2d3748]">TalkToMe</p>
            <p className="text-[10px] text-[#6b7a8d]">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
            style={{ background: "var(--neu-status-recovery)" }}
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Online
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-[#9aa5b4] transition-transform", isOpen && "rotate-180")}
          />
        </div>
      </button>

      {/* Body */}
      {isOpen && (
        <>
          {/* Disclaimer */}
          <div
            className="mx-4 mb-2 rounded-lg px-3 py-2 text-[10px] leading-relaxed text-[#6b7a8d]"
            style={{
              background: "var(--neu-bg)",
              boxShadow: "inset 2px 2px 5px var(--neu-shadow-dark), inset -2px -2px 5px var(--neu-shadow-light)",
            }}
          >
            <span className="font-semibold text-[#57677a]">{t.disclaimerTitle}</span>
            {" — "}
            {t.disclaimer}
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3"
            style={{
              minHeight: "260px",
              maxHeight: "360px",
              background: "var(--neu-chat-bg)",
              boxShadow: "inset 3px 3px 8px var(--neu-shadow-dark), inset -3px -3px 8px var(--neu-shadow-light)",
            }}
          >
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} lang={lang} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
          </div>

          {showSupportNudge && <SupportNudge lang={lang} />}

          {/* Input */}
          <div className="flex items-end gap-2 px-4 py-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              rows={2}
              className="flex-1 resize-none rounded-xl px-3 py-2.5 text-sm leading-relaxed text-[#2d3748] outline-none placeholder:text-[#9aa5b4] focus:ring-2 focus:ring-[var(--neu-status-surgery)]/30"
              style={{
                background: "var(--neu-bg)",
                boxShadow: "inset 3px 3px 7px var(--neu-shadow-dark), inset -3px -3px 7px var(--neu-shadow-light)",
                border: "none",
              }}
              aria-label={t.ariaInput}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
                "disabled:opacity-40"
              )}
              style={{
                background: input.trim() && !isTyping ? "var(--neu-status-surgery)" : "var(--neu-bg)",
                boxShadow: input.trim() && !isTyping
                  ? "3px 3px 8px var(--neu-shadow-dark), -3px -3px 8px var(--neu-shadow-light)"
                  : "inset 2px 2px 5px var(--neu-shadow-dark), inset -2px -2px 5px var(--neu-shadow-light)",
              }}
              aria-label={t.ariaSend}
            >
              <Send className={cn("h-4 w-4", input.trim() && !isTyping ? "text-white" : "text-[#9aa5b4]")} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
