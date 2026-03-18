import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay";
import passport from "./config/passport.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { connectDB } from "./database/db.js";
import { generateResponse } from "./src/service/ai.service.js";

import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/courses.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hi");
});
// HTTP server create
const server = createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: ["https://lmsclient-ruddy.vercel.app", process.env.CLIENT_URL],
  },
});
app.use(
  cors({
    origin: ["https://lmsclient-ruddy.vercel.app", process.env.CLIENT_URL],
    credentials: true,
  }),
);
// Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Connect DB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Static folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "req not found" });
});

/* ---------------- SOCKET.IO ---------------- */

const chatHistory = [];

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("ai-message", async (data) => {
    console.log("data", data);

    chatHistory.push({
      role: "user",
      parts: [{ text: data }],
    });

    const response = await generateResponse(chatHistory);

    chatHistory.push({
      role: "model",
      parts: [{ text: response }],
    });

    socket.emit("ai-message-response", response);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
