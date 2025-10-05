import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

//passing server to socket.io allows it to listen for incoming WebSocket connections
//This is necessary because WebSocket connections are not handled by the standard HTTP request/response cycle
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId){
  return userSocketMap[userId];
}

//used to store online users
const userSocketMap = {} //{userId: socketId}, userId from db and socketId from below

//io.on helps you listen for events on the socket connection
//In this case, it listens for a "connection" event, 
//which is triggered when a new client connects to the server.
io.on("connection",(socket) => {
  console.log("A user connected", socket.id);

  //This holds the query parameters that the client 
  //sent when it first connected via WebSocket
  const userId = socket.handshake.query.userId;
  if(userId) userSocketMap[userId] = socket.id;

  //io.emit is used to send messages to all connected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
})

export { io, app, server };
