import express from "express";
import parksController from "../controllers/parksController.js";

const router = express.Router();

// Route to update the current park of dog
router.put("/enter/:parkId/:dogId", parksController.addDogToPark);
router.put("/exit/:dogId", parksController.removeDogFromPark);

// Route to retrieve dogs in the park
router.get("/:parkId", parksController.getPlayingDogs);

export default router;
