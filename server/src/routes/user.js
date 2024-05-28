import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// Route to add a new user
router.post("/add", userController.addUser);
router.get("/getInfo/:userId", userController.getUser);

export default router;
