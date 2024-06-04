//@ts-nocheck
import connection from "../db.js";
import { getImageFromImgur, uploadImageToImgur } from "../utils/imgur.js";
const addDog = (req, res) => {
  const { dogData, userId } = req.body;

  const sql = `INSERT INTO dogs (name,user_id,age,lifeStage,gender) VALUES (?,?,?,?,?)`;
  const values = [
    dogData.name,
    userId,
    dogData.age,
    dogData.lifeStage,
    dogData.gender,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding dog:", err);
      res.status(500).json({ error: "Failed to add dog" });
    } else {
      console.log("Dog added successfully");
      const insertedId = result.insertId;
      uploadImageToImgur(dogData.imageUrl, insertedId);

      res
        .status(200)
        .json({ message: "Dog added successfully", dogId: insertedId });
    }
  });
};

const deleteDog = (req, res) => {
  const { dogId } = req.params;

  const sql = `DELETE FROM dogs WHERE id = ?`;

  connection.query(sql, [dogId], (err, result) => {
    if (err) {
      console.error("Error deleting dog:", err);
      res.status(500).json({ error: "Failed to delete dog" });
    } else {
      console.log("Dog deleted successfully");
      res.status(200).json({ message: "Dog deleted successfully" });
    }
  });
};

const getUserDogs = (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT * FROM dogs WHERE user_id =?`;
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error getting user's dogs:", err);
      return res.status(500).json({ error: "Failed to get user's dogs" });
    }

    return res.status(200).json(result);
  });
};

const getDog = (req, res) => {
  const { dogId } = req.params;
  console.log("getDog1", dogId);

  const sql = `SELECT * FROM dogs WHERE id =?`;
  connection.query(sql, [dogId], (err, result) => {
    if (err) {
      console.error("Error getting dog:", err);
      return res.status(500).json({ error: err });
    }

    return res.status(200).json(result);
  });
};

const updateDog = (req, res) => {
  const { dogData } = req.body;
  console.log(dogData);
  const sql = `UPDATE dogs SET name = ?, age = ?, lifeStage = ?, gender= ? WHERE id = ?`;
  const values = [
    dogData.name,
    dogData.age,
    dogData.lifeStage,
    dogData.gender,
    dogData.id,
  ];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error getting user's dogs:", err);
      return res.status(500).json({ error: "Failed to get user's dogs" });
    }
    uploadImageToImgur(dogData.imageUrl, dogData.id);
    return res.status(200).json(result);
  });
};

const updateCurrentPark = (req, res) => {
  const { dogId } = req.params;
  const { parkId } = req.body;
  console.log(parkId, dogId);
  const sql = `UPDATE dogs
  SET current_parkId = ?
  WHERE id = ?;`;
  const values = [parkId, dogId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding dog to park:", err);
      res.status(500).json({ error: "Failed to add dog to park" });
    } else {
      console.log("Dog added to the park successfully");
      res.status(200).json({ message: "Dog added successfully" });
    }
  });
};

const getPlayingDogs = (req, res) => {
  const { parkId } = req.params;
  const sql = `SELECT * FROM dogs WHERE current_parkId =?`;
  const values = [parkId];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error getting park's dogs:", err);
      return res.status(500).json({ error: "Failed to get parks's dogs" });
    }
    console.log("ress" + result.length);
    return res.status(200).json(result);
  });
};

const getDogProfileImage = (req, res) => {
  const { dogId } = req.params;
  const link = getImageFromImgur(dogId);
  return res.status(200).json({ imageUrl: link });
};

export default {
  addDog,
  deleteDog,
  getUserDogs,
  updateDog,
  updateCurrentPark,
  getDogProfileImage,
  getDog,
};
