import { Socket } from "socket.io";
import { Message } from "./message.i";

export interface ChatProps {
  params: {
    room: string;
    name: string;
  };
}

export interface ChatState {
  messages: Message[];
  socket: Socket;
}
