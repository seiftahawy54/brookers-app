import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./utils/db.js";
import AppRoutes from "./routes/index.js";
import { Server } from "socket.io";
import comments from "./socket/comments.js";
import errorHandler from "./middlewars/errorHandler.js";
import notFoundHandler from "./middlewars/notFoundHandler.js";
import chats from "./socket/chats.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", AppRoutes);

app.use("*", notFoundHandler);
app.use(errorHandler);

try {
  await db();

  const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });

  const io = new Server(server);

  // io.use(isAuthSocket);
  io.on("connection", (socket) => {
    console.log(`main connection`);
  });
  comments(io);
  chats(io);
} catch (e) {
  console.log(`connection error ${e}`);
}
