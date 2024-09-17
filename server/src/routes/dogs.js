import express from "express";
import dogsController from "../controllers/dogsController.js";
import upload from "../middleware/upload.js";
const router = express.Router();
import db from "../db.js";

// Route to add a new dog
router.post("/add", dogsController.addDog);


router.delete("/:delete/:dogId", dogsController.deleteDog);

// Route to update an existing dog
router.put("/update/:dogId", dogsController.updateDog);

// Route to retrieve dogs for a specific user
router.get("/userDogs/:userId", dogsController.getUserDogs);

// Route to retrieve dog by its id
router.get("/:dogId", dogsController.getDog);



// Route to upload an image for a specific dog
router.post("/upload/:dogId", upload.single("file"), function (req, res) {
  console.log("Upload:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { dogId } = req.params;
  const fileName = req.file.filename;

  const sql = `UPDATE dogs SET imageName = ? WHERE id = ?`;
  const values = [fileName, dogId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error uploading dog image:", err);
      return res.status(500).json({ error: "Failed to upload dog image" });
    } else {
      const filePath = `/uploads/${fileName}`; // Assuming the uploads folder is publicly accessible

      return res
        .status(200)
        .json({ message: "Dog image uploaded successfully",filePath });
    }
  });
});


export default router;
