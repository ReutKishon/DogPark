//@ts-nocheck
import connection from "../db.js";
const updateDogCurrentPark = (req, res) => {
  const { parkId, dogId } = req.params;
  console.log(parkId, dogId);
  const sql = `UPDATE dogs
  SET current_parkId = ?
  WHERE id = ?;`;
  const values = [parkId, dogId];

  connection.query(sql, values, (err, result) => {
    if (err) {
        console.error("Error update dog current park:", err);
        res.status(500).json({ error: "Error update dog current park" });
    } else {
      console.log("update dog current park successfully");
      res.status(200).json({ message: "update dog current park successfully" });
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

export default {
  updateDogCurrentPark,
  getPlayingDogs,
};
