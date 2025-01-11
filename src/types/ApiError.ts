export interface ApiError {
  message: string;
  code: number;
  timestamp: string;
  retryable: boolean;
}
