/**
 * Mock data for the TalkToMe chat.
 *
 * The "TalkToMe" agent speaks with the psychological sensitivity of a trained
 * hospital psychologist. It listens, validates emotions, provides calm
 * reassurance, and gently flags when a family member may need in-person support.
 *
 * HIPAA / LGPD: the chat never references clinical details.
 * It only acknowledges feelings and provides emotional support.
 */

export type TalkToMeRole = "family" | "agent";

export interface TalkToMeMessage {
  id: string;
  role: TalkToMeRole;
  content: string;
  contentPT: string;
  /** Minutes ago */
  minutesAgo: number;
  /** Agent flags this message as needing human follow-up */
  flaggedForSupport?: boolean;
}

/** Opening message the agent sends automatically when the page loads */
export const agentGreeting: TalkToMeMessage = {
  id: "ttm-0",
  role: "agent",
  content:
    "Hi, I'm here with you. Waiting during a surgery can feel overwhelming, and that's completely understandable. You can talk to me about how you're feeling — I'm here to listen, without judgment.",
  contentPT:
    "Olá, estou aqui com você. Esperar durante uma cirurgia pode ser muito difícil, e isso é completamente compreensível. Você pode me contar como está se sentindo — estou aqui para ouvir, sem julgamentos.",
  minutesAgo: 0,
};

/** Initial mock conversation thread */
export const mockTalkToMeMessages: TalkToMeMessage[] = [
  {
    id: "ttm-1",
    role: "agent",
    content:
      "Hi, I'm here with you. Waiting during a surgery can feel overwhelming, and that's completely understandable. You can talk to me about how you're feeling — I'm here to listen, without judgment.",
    contentPT:
      "Olá, estou aqui com você. Esperar durante uma cirurgia pode ser muito difícil, e isso é completamente compreensível. Você pode me contar como está se sentindo — estou aqui para ouvir, sem julgamentos.",
    minutesAgo: 12,
  },
  {
    id: "ttm-2",
    role: "family",
    content: "I'm really scared. It's been over 2 hours and I don't know what's happening.",
    contentPT: "Estou com muito medo. Já faz mais de 2 horas e não sei o que está acontecendo.",
    minutesAgo: 11,
  },
  {
    id: "ttm-3",
    role: "agent",
    content:
      "Your fear makes complete sense. Two hours of not knowing is really hard. The status update shows the surgery is still in progress — the team is fully focused on your loved one right now. It's okay to feel scared. Would you like to tell me a little about them?",
    contentPT:
      "Seu medo faz todo sentido. Duas horas sem saber é muito difícil. A atualização de status mostra que a cirurgia ainda está em andamento — a equipe está totalmente focada no seu familiar agora. Tudo bem sentir medo. Você gostaria de me contar um pouco sobre ele(a)?",
    minutesAgo: 10,
  },
];

/**
 * Psychologist-aware canned responses the agent can cycle through.
 * In production these would come from an LLM with a system prompt
 * that enforces empathy, active listening, and clinical sensitivity.
 */
export const cannedAgentResponses: string[] = [
  "That sounds really hard. It's natural to feel that way when someone you love is in surgery. Take a breath — you're not alone in this waiting room.",
  "Thank you for sharing that with me. Your feelings are valid. The medical team is trained for exactly this kind of surgery, and they're focused entirely on your loved one.",
  "It's okay not to be okay right now. Many families feel the same mix of fear and hope. Would it help to talk about a memory of your loved one?",
  "I hear you. When you're ready, our hospital psychologist is also available in person at the waiting area support desk. You don't have to face this alone.",
  "You're being incredibly strong just by being here. Is there anything specific you're worried about that I can help address?",
  "Waiting is one of the hardest parts. You're doing the right thing by staying close and staying informed. The status board will update as soon as there's news.",
];

export const cannedAgentResponsesPT: string[] = [
  "Parece muito difícil. É natural se sentir assim quando alguém que você ama está em cirurgia. Respire fundo — você não está sozinho(a) nessa sala de espera.",
  "Obrigado(a) por compartilhar isso comigo. Seus sentimentos são válidos. A equipe médica é treinada exatamente para esse tipo de cirurgia e está totalmente focada no seu familiar.",
  "Tudo bem não estar bem agora. Muitas famílias sentem essa mistura de medo e esperança. Ajudaria falar sobre uma lembrança do seu familiar?",
  "Estou ouvindo. Quando você estiver pronto(a), nossa psicóloga hospitalar também está disponível pessoalmente no balcão de apoio da sala de espera. Você não precisa enfrentar isso sozinho(a).",
  "Você está sendo incrivelmente forte só de estar aqui. Há algo específico que te preocupa e que eu posso ajudar a esclarecer?",
  "Esperar é uma das partes mais difíceis. Você está fazendo a coisa certa ficando por perto e se mantendo informado(a). O painel de status será atualizado assim que houver notícias.",
];
