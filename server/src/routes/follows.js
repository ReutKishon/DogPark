import express from "express";
import followsController from "../controllers/followsController.js";

const router = express.Router();

// Route to follow a dog
router.post("/follow/:userId/:dogId", followsController.follow);

// Route to unfollow a dog
router.delete("/unfollow/:userId/:dogId", followsController.unfollow);

// Route to get user followings
router.get("/followings/:userId", followsController.getFollowings);


export default router;
