// import "../types/custom.d.ts";
import express from "express";
import dogsRouter from "./routes/dogs.js";
import userRouter from "./routes/user.js";
import parksRouter from "./routes/parks.js";
import db from "./db.js";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const app = express();
const io = new Server(5000);

app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log("A client connected");
});

// @ts-ignore
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
