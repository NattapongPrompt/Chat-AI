import React from 'react';
import styles from './ChatMessage.module.scss';
import { Message } from '../types/Message';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`${styles.message} ${styles[message.role]}`}>
      <div className={styles.content}>
        {message.content}
      </div>
      <div className={styles.timestamp}>
        {message.timestamp.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;
