export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  metadata?: {
    model?: string;
    tokens?: number;
    temperature?: number;
  };
}

export interface ChatHistory {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  lastMessage?: string;
  lastMessageAt?: Date;
  messages: Message[];
  settings: ChatSettings;
}

export interface ChatSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface ChatSession {
  id: string;
  history: ChatHistory[];
  currentChatId: string | null;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    autoScroll: boolean;
    messageBubbles: boolean;
  };
}
