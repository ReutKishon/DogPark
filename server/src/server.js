import express from "express";
import dogsRouter from "./routes/dogs.js";
import userRouter from "./routes/user.js";
import parksRouter from "./routes/parks.js";
import authRouter from "./routes/auth.js";
import followsRouter from "./routes/follows.js";
import db from "./db.js";
import path from 'path';
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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



app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use("/dogs", dogsRouter);
app.use("/users", userRouter);
app.use("/parks", parksRouter);
app.use("/auth", authRouter);
app.use("/follow", followsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export function single(arg0) {
    throw new Error("Function not implemented.");
}

