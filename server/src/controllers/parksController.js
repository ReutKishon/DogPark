//@ts-nocheck
import connection from "../db.js";
const addDogToPark = (req, res) => {
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
  console.log("lala" + parkId);
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

export default {
  addDogToPark,
  getPlayingDogs,
};
