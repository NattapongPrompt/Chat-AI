import { Message as BaseMessage, MessageType, MessageRole } from './AppInterfaces';

/**
 * Extended Message interface with additional properties specific to our chat application
 */
export interface Message extends BaseMessage {
  content: string;
  role: MessageRole;
  type: MessageType;
  timestamp: Date;
  
  /** 
   * Indicates if the message contains sensitive content
   */
  isSensitive?: boolean;
  
  /**
   * Reactions to the message
   */
  reactions?: Record<string, number>;
  
  /**
   * Reference to a parent message if this is a reply
   */
  parentMessageId?: string;
  
  /**
   * Metadata for special message types
   */
  metadata?: {
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    imageDimensions?: {
      width: number;
      height: number;
    };
  };
}
