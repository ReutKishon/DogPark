
import express from "express";
import parksController from "../controllers/parksController.js";

const router = express.Router();

// Route to update the current park of dog
router.put("/updateDogCurrentPark/:parkId/:dogId", parksController.updateDogCurrentPark);

// Route to retrieve dogs in the park
router.get("/:parkId", parksController.getPlayingDogs);




export default router;
