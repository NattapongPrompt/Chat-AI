import React, { useState, useRef, useEffect } from 'react';
import { 
  Paper, 
  Box, 
  TextField, 
  IconButton, 
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
  Button
} from '@mui/material';
import { IoSend } from 'react-icons/io5';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';
import ChatMessage from './ChatMessage';
import { Message } from '@/types/Message';
import { MessageRole, MessageType } from '@/types/AppInterfaces';
import { ApiError } from '@/types/ApiError';
import Sidebar from './Sidebar';

interface ApiResponse {
  message: string;
  timestamp: string;
  success: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      status: 'sent',
      content: input,
      role: MessageRole.USER,
      type: 'text',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message);

      const botMessage: Message = {
        id: Date.now().toString(),
        senderId: 'bot',
        status: 'sent',
        content: data.message,
        role: MessageRole.ASSISTANT,
      type: 'text',
        timestamp: new Date(data.timestamp)
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            ChatGPT
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            What can I help with?
          </Typography>
        </Box>
        
        <ChatContainer chatId="main-chat" />
      </Box>
    </Box>
  );
}
