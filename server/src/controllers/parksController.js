//@ts-nocheck
const addDogToPark = (req, res) => {
  const { parkId, dogId } = req.params;
  const db = req.db;
  const io = req.io;
  console.log(parkId, dogId);
  const sql = `UPDATE dogs
  SET current_parkId = ?
  WHERE id = ?;`;
  const values = [parkId, dogId];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error adding dog to park" });
      throw err;
    }
    const fetchDogSql = "SELECT * FROM dogs WHERE id = ?";
    db.query(fetchDogSql, [dogId], (err, dogs) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!dogs || dogs.length === 0) {
        return res.status(404).send({ message: "Dog not found" });
      }

      const updatedDog = dogs[0]; // Assuming dogs is an array, take the first element
      //console.log(JSON.stringify(updatedDog));
      io.emit("updateDogInPark", { parkId, dog: updatedDog });

      res.status(200).json({ message: "added dog to park successfully" });
    });
  });
};

const removeDogFromPark = (req, res) => {
  const { dogId } = req.params;
  const db = req.db;
  const io = req.io;

  const sql = `UPDATE dogs
  SET current_parkId = NULL
  WHERE id = ?;`;
  const values = [dogId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error removing dog from park:", err);
      res.status(500).json({ error: "Error removing dog from park" });
    } else {
      console.log("removed dog from park successfully");
      res.status(200).json({ message: "removed dog from park successfully" });
    }
  });
};

const getPlayingDogs = (req, res) => {
  const { parkId } = req.params;
  const db = req.db;

  const sql = `SELECT * FROM dogs WHERE current_parkId =?`;
  const values = [parkId];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error getting park's dogs:", err);
      return res.status(500).json({ error: "Failed to get parks's dogs" });
    }
    return res.status(200).json(result);
  });
};

export default {
  addDogToPark,
  removeDogFromPark,
  getPlayingDogs,
};
