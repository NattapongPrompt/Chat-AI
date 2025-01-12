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
  Button,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { IoSend } from 'react-icons/io5';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';
import ChatMessage from './ChatMessage';
import { Message } from '@/types/Message';
import { MessageRole, MessageType } from '@/types/AppInterfaces';
import { ApiError } from '@/types/ApiError';
import Sidebar from './Sidebar';
import useLocalStorage from '@/hooks/useLocalStorage';

interface ApiResponse {
  message: string;
  timestamp: string;
  success: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useLocalStorage<Message[]>('chatMessages', []);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState<Record<string, 'sending' | 'sent' | 'failed'>>({});
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

    const messageId = Date.now().toString();
    const userMessage: Message = {
      id: messageId,
      senderId: 'user',
      status: 'sending',
      content: input,
      role: MessageRole.USER,
      type: 'text',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessageStatus(prev => ({ ...prev, [messageId]: 'sending' }));
    setInput('');
    setIsTyping(true);
    setLoading(true);

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
      setMessageStatus(prev => ({ ...prev, [messageId]: 'sent' }));
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send message. Please try again.');
      setMessageStatus(prev => ({ ...prev, [messageId]: 'failed' }));
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setMessageStatus({});
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: newContent } : msg
    ));
  };

  const handleRetryMessage = async (messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (!message) return;

    setMessageStatus(prev => ({ ...prev, [messageId]: 'sending' }));
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.content })
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
      setMessageStatus(prev => ({ ...prev, [messageId]: 'sent' }));
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to resend message. Please try again.');
      setMessageStatus(prev => ({ ...prev, [messageId]: 'failed' }));
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        onClearChat={handleClearChat}
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

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        <ChatContainer 
          chatId="main-chat" 
          messages={messages}
          messageStatus={messageStatus}
          onEditMessage={handleEditMessage}
          onRetryMessage={handleRetryMessage}
        />

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
