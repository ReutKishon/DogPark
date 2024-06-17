import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/getInfo/:userId", userController.getUser);

export default router;
