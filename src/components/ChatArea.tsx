import React from 'react';
import styles from './ChatArea.module.scss';
import { Message } from '../types/Message';
import ChatMessage from './ChatMessage';

interface ChatAreaProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isTyping }) => {
  return (
    <div className={styles.container}>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
        />
      ))}
      
      {isTyping && (
        <div className={styles.typingIndicator}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
