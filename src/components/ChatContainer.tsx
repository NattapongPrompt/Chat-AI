import React, { useState, useRef } from 'react';
import ChatArea from './ChatArea';
import ChatInput from './ChatInput';
import { Message } from '../types/Message';
import styles from './ChatContainer.module.scss';

interface ChatContainerProps {
  chatId: string | null;
}
interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  onStop: () => void;
  isLoading: boolean;
}
const ChatContainer: React.FC<ChatContainerProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      abortController.current = new AbortController();
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: content }),
        signal: abortController.current.signal
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: 'Failed to get response. Please try again.',
          role: 'system',
          timestamp: new Date(),
          type: 'error'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleStop = () => {
    if (abortController.current) {
      abortController.current.abort();
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.container}>
      <ChatArea messages={messages} isTyping={isTyping} />
      <ChatInput onSend={handleSendMessage} onStop={handleStop} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
