
import express from "express";
import dogsController from "../controllers/dogsController.js";

const router = express.Router();

// Route to add a new dog
router.post("/add", dogsController.addDog);

export default router;
