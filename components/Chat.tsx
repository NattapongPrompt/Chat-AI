import React, { useState } from 'react';
import { ChatMessage } from '../types/chat';
import styled from 'styled-components';

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const MessageList = styled.div`
  height: 500px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const MessageInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((msg) => (
          <div key={msg.id} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <p><strong>{msg.role}:</strong> {msg.content}</p>
          </div>
        ))}
      </MessageList>
      <div>
        <MessageInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
      </div>
    </ChatContainer>
  );
}
