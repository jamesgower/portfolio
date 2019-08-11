export interface MessageProps {
  type: string;
  message: Message;
  admin?: boolean;
  location?: boolean;
}

export interface Message {
  sender: string;
  createdAt: number;
  text?: string;
  url?: string;
}
