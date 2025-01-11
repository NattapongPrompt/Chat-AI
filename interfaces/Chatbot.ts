
export interface ChatGPT {
  sendMessage(message: string): Promise<string>;
  getResponse(): Promise<string>;
}