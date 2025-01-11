import React, { useState } from 'react';
import styles from './ChatInput.module.scss';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onStop, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        disabled={isLoading}
        placeholder="Type your message..."
      />
      <button className={styles.button} onClick={handleSend} disabled={isLoading}>
        Send
      </button>
      <button onClick={onStop} disabled={!isLoading}>
        Stop
      </button>
    </div>
  );
};

export default ChatInput;
