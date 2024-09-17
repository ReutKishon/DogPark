import express from "express";
import dogsRouter from "./routes/dogs.js";
import userRouter from "./routes/user.js";
import parksRouter from "./routes/parks.js";
import authRouter from "./routes/auth.js";
import followsRouter from "./routes/follows.js";
import db from "./db.js";
import path from "path";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
const dirname = path.dirname(filePath);

const app = express();
const io = new Server(5000);

app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log("A client connected");
});

app.use((req, res, next) => {
  // @ts-ignore
  req.db = db;
  // @ts-ignore
  req.io = io;
  next();
});

app.use("/dogs", dogsRouter);
app.use("/users", userRouter);
app.use("/parks", parksRouter);
app.use("/auth", authRouter);
app.use("/follow", followsRouter);
app.use("/uploads", express.static(path.join(dirname, "../uploads")));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
