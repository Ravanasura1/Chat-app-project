import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"], // Updated to correct URL
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {}

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }
    
    //io emmit is used to send message to all connected client

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId]

        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
});

export { app, io, server };
