
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";
import { Project } from "./models/project.model.js";
import { Message } from "./models/message.model.js";
import app from "./app.js";

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://codecollaby-frontend.onrender.com",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = new Map();

// Authenticate every socket using the existing accessToken cookie.
io.use(async (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie || "";

    const cookies = Object.fromEntries(
      cookieHeader.split(";").filter(Boolean).map((item) => {
        const index = item.indexOf("=");
        return [
          item.slice(0, index).trim(),
          decodeURIComponent(item.slice(index + 1).trim()),
        ];
      })
    );

    const token =
      cookies.accessToken ||
      socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decoded._id).select(
      "_id fullName email"
    );

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Invalid or expired session"));
  }
});

const getClientsInRoom = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => ({
      socketId,
      userName: userSocketMap.get(socketId)?.fullName,
    })
  );
};

io.on("connection", (socket) => {
  console.log("Authenticated user connected:", socket.user.fullName);

  // JOIN ROOM
  socket.on("join-room", async ({ roomId }, callback) => {
    try {
      if (
        typeof roomId !== "string" ||
        !roomId.trim() ||
        roomId.length > 100
      ) {
        return callback?.({
          success: false,
          message: "Invalid room ID",
        });
      }

      const previousRooms = [...socket.rooms].filter(
        (room) => room !== socket.id
      );

      for (const room of previousRooms) {
        socket.leave(room);
      }

      userSocketMap.set(socket.id, socket.user);
      socket.join(roomId);

      const clientsInRoom = getClientsInRoom(roomId);

      io.to(roomId).emit("clients-in-room", {
        clientsInRoom,
      });

      callback?.({
        success: true,
        clientsInRoom,
      });
    } catch (error) {
      callback?.({
        success: false,
        message: "Unable to join room",
      });
    }
  });

  // LIVE CODE BROADCAST
  socket.on("code-change", ({ roomId, code, language }) => {
    if (
      typeof roomId !== "string" ||
      typeof code !== "string" ||
      code.length > 500000 ||
      !socket.rooms.has(roomId)
    ) {
      return;
    }

    socket.to(roomId).emit("code-update", {
      code,
      language,
      userName: socket.user.fullName,
    });
  });

  // PERSIST CODE TO MONGODB
  socket.on("save-code", async ({ projectId, code, language }, callback) => {
    try {
      if (
        !projectId ||
        typeof code !== "string" ||
        code.length > 500000
      ) {
        return callback?.({
          success: false,
          message: "Invalid code data",
        });
      }

      const project = await Project.findOne({
        _id: projectId,
        owner: socket.user._id,
      });

      if (!project) {
        return callback?.({
          success: false,
          message: "Project not found or access denied",
        });
      }

      project.code = code;
      project.language = language || project.language;

      const mainFile = project.files.find(
        (file) => file.path === "index.js"
      );

      if (mainFile) {
        mainFile.content = code;
        mainFile.language = language || mainFile.language;
      }

      await project.save();

      callback?.({ success: true });
    } catch (error) {
      callback?.({
        success: false,
        message: "Unable to save code",
      });
    }
  });

  // SEND CHAT MESSAGE
  socket.on("send-message", async ({ roomId, message }, callback) => {
    try {
      if (
        typeof roomId !== "string" ||
        !socket.rooms.has(roomId) ||
        typeof message !== "string" ||
        !message.trim() ||
        message.length > 2000
      ) {
        return callback?.({
          success: false,
          message: "Invalid message",
        });
      }

      const savedMessage = await Message.create({
        roomId,
        sender: socket.user._id,
        senderName: socket.user.fullName,
        message: message.trim(),
      });

      const messageData = {
        _id: savedMessage._id,
        roomId,
        sender: socket.user._id,
        senderName: socket.user.fullName,
        message: savedMessage.message,
        createdAt: savedMessage.createdAt,
      };

      io.to(roomId).emit("receive-message", messageData);

      callback?.({
        success: true,
        data: messageData,
      });
    } catch (error) {
      callback?.({
        success: false,
        message: "Unable to send message",
      });
    }
  });

  // DISCONNECT
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];

    for (const roomId of rooms) {
      if (roomId !== socket.id) {
        socket.to(roomId).emit("user-disconnected", {
          socketId: socket.id,
          userName: socket.user.fullName,
        });
      }
    }
  });

  socket.on("disconnect", () => {
    userSocketMap.delete(socket.id);
    console.log("User disconnected:", socket.id);
  });
});

export default server;
