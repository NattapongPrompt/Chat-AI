import React, { useState, useRef, useEffect } from 'react';
import { 
  Paper, 
  Box, 
  TextField, 
  IconButton, 
  Card, 
  CardContent, 
  Typography,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import { IoSend } from 'react-icons/io5';
import { ChatMessage } from '../../types/chat';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      setIsTyping(false);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsTyping(false);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: isMobile ? '90vh' : '70vh',
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        background: theme.palette.background.paper,
      }}
    >
      <Box sx={{ 
        flex: 1, 
        p: isMobile ? 1 : 2, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        bgcolor: theme.palette.grey[100],
      }}>
        {messages.map((msg, index) => (
          <Fade in={true} timeout={500} key={msg.id}>
            <Card 
              sx={{ 
                maxWidth: isMobile ? '85%' : '70%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                bgcolor: msg.role === 'user' ? 'primary.main' : 'background.paper',
                boxShadow: msg.role === 'user' 
                  ? '0 4px 6px -1px rgba(37, 99, 235, 0.1)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                <Typography 
                  color={msg.role === 'user' ? 'white' : 'text.primary'}
                  sx={{ wordBreak: 'break-word' }}
                >
                  {msg.content}
                </Typography>
                <Typography 
                  variant="caption" 
                  color={msg.role === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
                  sx={{ display: 'block', mt: 0.5, textAlign: msg.role === 'user' ? 'right' : 'left' }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        ))}
        {isTyping && (
          <Card sx={{ maxWidth: '70%', alignSelf: 'flex-start' }}>
            <CardContent>
              <Typography>Typing...</Typography>
            </CardContent>
          </Card>
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ 
        p: isMobile ? 1 : 2, 
        bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.grey[200]}`,
      }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: theme.palette.grey[100],
              }
            }}
          />
          <IconButton 
            color="primary" 
            onClick={handleSend}
            sx={{ 
              p: isMobile ? 1 : 2,
              bgcolor: 'primary.main', 
              color: 'white',
              '&:hover': { 
                bgcolor: 'primary.dark',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <IoSend />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
