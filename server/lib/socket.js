import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// used to store online users
const userSocketMap = {}; // {userId: socketId}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
     socket.join(userId);
  }

  // notify all clients about online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // handle sending messages
 socket.on("sendMessage", ({ senderId, receiverId, text }) => {
  const receiverSocketId = getReceiverSocketId(receiverId);

  // build the newMessage object
  const newMessage = {
    senderId,
    receiverId,
    text,
    createdAt: new Date(),
  };

  if (receiverSocketId) {
    // deliver to the receiver
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  // also deliver back to the sender (so they see it instantly too)
  io.to(socket.id).emit("newMessage", newMessage);
});


  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
