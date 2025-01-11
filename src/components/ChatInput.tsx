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

  const productivityTools = [
    { icon: '📝', label: 'Create Plan', key: 'plan' },
    { icon: '💬', label: 'Get Advice', key: 'advice' },
    { icon: '💻', label: 'Write Code', key: 'code' },
    { icon: '🌍', label: 'Translate', key: 'translation' },
    { icon: '📄', label: 'Summarize', key: 'summarize' },
    { icon: '🖼️', label: 'Analyze Image', key: 'image-analysis' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.productivityTools}>
        {productivityTools.map(item => (
          <div key={item.key} className={styles.tool}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
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
        <button 
          className={`${styles.stopButton} ${isLoading ? styles.loading : ''}`}
          onClick={onStop} 
          disabled={!isLoading}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
