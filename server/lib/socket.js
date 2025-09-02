  import { Server } from "socket.io";
  
  import http from "http";
  import express from "express";

  const app = express();
  const server = http.createServer(app);

  // store online users { userId: socketId }
  const userSocketMap = {};

  export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }

  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://pingmechatapp.onrender.com",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log(` User ${userId} mapped to socket ${socket.id}`);
    }

    // notify all clients about online users
   io.emit(
  "getOnlineUsers",
  Object.keys(userSocketMap).map((id) => id.toString())
);

    socket.on("disconnect", () => {
      console.log(" User disconnected:", socket.id);
      if (userId) {
        delete userSocketMap[userId];
      }
 io.emit(
    "getOnlineUsers",
    Object.keys(userSocketMap).map((id) => id.toString())
  );
    });
  });

  export { io, app, server };
