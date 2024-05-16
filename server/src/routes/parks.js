import express from "express";
import parksController from "../controllers/parksController.js";

const router = express.Router();

// Route to add a new dog to park
router.put("/add/:dogId", parksController.addDogToPark);
router.get("/:parkId", parksController.getPlayingDogs);

export default router;
