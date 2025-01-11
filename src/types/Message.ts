export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageType = 'text' | 'code' | 'error';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  type: MessageType;
  sender?: string;
}
