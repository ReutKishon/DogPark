
import express from "express";
import dogsController from "../controllers/userController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

// Route to add a new user
router.post("/add", userController.addUser);

export default router;
