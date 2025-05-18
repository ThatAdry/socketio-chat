import { Server } from "socket.io";

import type { Server as HTTPServer } from "http";
import type { ClientEvents } from "../socket-client";

import Group from "../classes/Group";
import User from "../classes/User";
import BubbleContainer from "../classes/BubbleContainer";

export interface SocketData {
  user: User;
  group: Group;
}

export interface ServerEvents {
  logged: (data: SocketData) => void;
  newUser: (data: SocketData["user"]) => void;
  newAdmin: (data: SocketData["user"]) => void;
  leaveUser: (id: string) => void;
  message: (container: ReturnType<typeof BubbleContainer.prototype.toJSON>) => void;
  sticker: (id: number, user: User) => void;
  reactMessage: (value: string, id: number, userId: string) => void;
  unReactMessage: (value: string, id: number, userId: string) => void;
  deleteMessage: (id: number, from: string) => void;
}

export default function io(ServerInstace: HTTPServer) {
  const io = new Server<ClientEvents, ServerEvents, {}, SocketData>(ServerInstace, {});

  const GroupChatMap = new Map<string, Group>();

  // middlewares
  io.use((socket, next) => {
    try {
      const { username, chatId } = socket.handshake.auth as {
        username: string;
        chatId: string;
      };

      let user: User;

      //check username length
      if (username.length > 2 && username.length < 21) user = new User(username);
      else throw new Error("Parametter Error");

      let group: Group;

      //check chatId
      if (chatId == "") {
        // create a new group
        group = new Group(user);
        GroupChatMap.set(group.id, group);
      } else if (GroupChatMap.has(chatId)) {
        // search group
        group = GroupChatMap.get(chatId)!;
        group.insertUser(user);
      } else throw new Error("Incorrect room code");

      socket.data = { user, group };
      next();
    } catch (err) {
      next(err as Error);
    }
  });

  io.on("connection", function (socket) {
    const { group, user } = socket.data;

    user.socketId = socket.id;
    socket.join(group.id);
    socket.emit("logged", socket.data);
    socket.to(group.id).emit("newUser", user);

    // MESSAGES
    socket.on("message", (content, replyId, callback) => {
      const bubble = new BubbleContainer(content, group.messageCount, user.id, user.name, replyId);
      socket.to(group.id).emit("message", bubble);
      callback(group.messageCount);
      group.messageCount++;
    });

    socket.on("reactMessage", (value, id, callback) => {
      socket.to(group.id).emit("reactMessage", value, id, user.id);
      callback();
    });

    socket.on("unReactMessage", (value, id, callback) => {
      socket.to(group.id).emit("unReactMessage", value, id, user.id);
      callback();
    });

    socket.on("deleteMessage", (id, callback) => {
      socket.to(group.id).emit("deleteMessage", id, user.id);
      callback();
    });

    socket.on("kickUser", (id) => {
      const user = group.getUser(id);
      if (user) {
        io.to(group.id).emit("leaveUser", user.id);
        io.sockets.sockets.get(user.socketId)?.disconnect(true);
      }
    });

    socket.on("disconnect", () => {
      try {
        socket.to(group.id).emit("leaveUser", user.id);
        group.removeUser(user);

        if (group.users.length < 1) {
          return GroupChatMap.delete(group.id);
        }

        if (user.id == group.admin.id) {
          group.admin = group.users[0];
          group.admin.admin = true;
          socket.to(group.id).emit("newAdmin", group.admin);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });

  return io;
}
