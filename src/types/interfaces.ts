export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type: 'text' | 'code' | 'markdown';
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  modelId: string;
  createdAt: Date;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  type: 'local' | 'api';
  path?: string;
  maxTokens: number;
}
