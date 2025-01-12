import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Message } from '@/types/Message';

interface ChatMessageProps {
  message: Message;
  status: 'sending' | 'sent' | 'failed';
  onEdit: (newContent: string) => void;
  onRetry: () => void;
}

export default function ChatMessage({ 
  message, 
  status,
  onEdit,
  onRetry
}: ChatMessageProps) {
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
        <Box className="flex justify-between items-center mt-2">
          <Typography 
            variant="caption" 
            className="text-gray-500 dark:text-gray-400"
          >
            {message.timestamp.toLocaleTimeString()}
          </Typography>
          {status === 'failed' && (
            <IconButton size="small" onClick={onRetry}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          )}
          {message.role === 'user' && status === 'sent' && (
            <IconButton size="small" onClick={() => onEdit(message.content)}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
