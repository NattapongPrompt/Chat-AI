export interface Theme {
  isDarkMode: boolean;
  primaryColor: string;
  secondaryColor: string;
  fontSize: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'ai';
  type: 'text' | 'code' | 'image';
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: string;
  isEnabled: boolean;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
  retry?: () => void;
}
