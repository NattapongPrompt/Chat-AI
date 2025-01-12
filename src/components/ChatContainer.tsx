import React from 'react';
import { Box } from '@mui/material';
import ChatMessage from './ChatMessage';
import { Message } from '@/types/Message';

interface ChatContainerProps {
  chatId: string;
  messages: Message[];
  messageStatus: Record<string, 'sending' | 'sent' | 'failed'>;
  onEditMessage: (messageId: string, newContent: string) => void;
  onRetryMessage: (messageId: string) => Promise<void>;
}

export default function ChatContainer({
  chatId,
  messages,
  messageStatus,
  onEditMessage,
  onRetryMessage
}: ChatContainerProps) {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          status={messageStatus[message.id]}
          onEdit={(newContent) => onEditMessage(message.id, newContent)}
          onRetry={() => onRetryMessage(message.id)}
        />
      ))}
    </Box>
  );
}
