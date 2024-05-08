
import express from "express";
import dogsController from "../controllers/dogsController.js";

const router = express.Router();

// Route to add a new dog
router.post("/add", dogsController.addDog);

// Route to update an existing dog
router.put("/update/:dogId", dogsController.updateDog);

// Route to retrieve dogs for a specific user
router.get("/:userId", dogsController.getUserDogs);


export default router;
