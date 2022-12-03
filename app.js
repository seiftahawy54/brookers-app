import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./utils/db.js";
import AppRoutes from "./routes/index.js";
import { isAuthSocket } from "./middlewars/isAuth.js";
import { Server } from "socket.io";
import comments from "./socket/comments.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", AppRoutes);

app.use((err, req, res, next) => {
  if (err.statusCode === 500) {
    return res.status(500).json({ error: true, message: err.message });
  }
  return next();
});

app.use((req, res) => {
  res.status(404).json({ message: "route not found!" });
});

try {
  await db();

  const server = app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });

  const io = new Server(server);

  // io.use(isAuthSocket);
  io.on("connection", (socket) => {
    console.log(`main connection`);
  });
  comments(io);
} catch (e) {
  console.log(`connection error ${e}`);
}
