import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Message } from '../types/Message';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <Box 
      className={`flex flex-col mb-4 ${
        message.role === 'user' ? 'items-end' : 'items-start'
      }`}
    >
      <Paper
        elevation={3}
        className={`p-4 max-w-[80%] ${
          message.role === 'user'
            ? 'bg-blue-100 dark:bg-blue-900'
            : 'bg-gray-100 dark:bg-gray-700'
        }`}
      >
        <Typography variant="body1" className="text-gray-800 dark:text-gray-200">
          {message.content}
        </Typography>
        <Typography 
          variant="caption" 
          className="block mt-2 text-right text-gray-500 dark:text-gray-400"
        >
          {message.timestamp.toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage;
