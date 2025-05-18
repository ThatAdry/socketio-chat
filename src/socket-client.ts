import { io, Socket as SocketIO } from "socket.io-client";

import type { ServerEvents } from "./backend/socket-server";
import type { SocketData } from "./backend/socket-server";
import BubbleContainer from "./classes/BubbleContainer";

export interface ClientEvents {
  logged: (data: SocketData) => void;
  message: (content: BubbleContainer["content"], replyId: number, callback: (containerId: number) => void) => void;
  sticker: (id: number, callback: (containerId: number) => void) => void;
  reactMessage: (value: string, id: number, callback: () => void) => void;
  unReactMessage: (value: string, id: number, callback: () => void) => void;
  deleteMessage: (id: number, callback: () => void) => void;
  kickUser: (id: string) => void;
}

const Socket: SocketIO<ServerEvents, ClientEvents> = io({
  autoConnect: false,
  withCredentials: true,
});

export default Socket;
