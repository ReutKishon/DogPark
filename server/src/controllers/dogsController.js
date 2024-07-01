//@ts-nocheck

const addDog = (req, res) => {
  const { dogData, userId } = req.body;

  const sql = `INSERT INTO dogs (name,user_id,age,gender) VALUES (?,?,?,?)`;
  const values = [dogData.name, userId, dogData.age, dogData.gender];
  req.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding dog:", err);
      res.status(500).json({ error: "Failed to add dog" });
    } else {
      console.log("Dog added successfully");
      const insertedId = result.insertId;
      res
        .status(200)
        .json({ message: "Dog added successfully", dogId: insertedId });
    }
  });
};

const uploadDogImage = (req, res) => {
  const { dogId } = req.params;
  const fileName = req.file ? req.file.filename : null;
  console.log("filename: ", filename);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const sql = `UPDATE dogs SET imageName = ? WHERE id = ?`;
  const values = [fileName, dogId];

  req.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error uploading dog image:", err);
      res.status(500).json({ error: "Failed to upload dog image" });
    } else {
      console.log("Dog image uploaded successfully");
      res.status(200).json({ message: "Dog image uploaded successfully" });
    }
  });
};

const deleteDog = (req, res) => {
  const { dogId } = req.params;

  const sql = `DELETE FROM dogs WHERE id = ?`;

  req.db.query(sql, [dogId], (err, result) => {
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
  const sql = `SELECT * from dogs WHERE user_id =?`;
  req.db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error getting user's dogs:", err);
      return res.status(500).json({ error: "Failed to get user's dogs" });
    }

    return res.status(200).json(result);
  });
};

const getDog = (req, res) => {
  const { dogId } = req.params;

  const sql = `SELECT * FROM dogs WHERE id =?`;
  req.db.query(sql, [dogId], (err, result) => {
    if (err) {
      console.error("Error getting dog:", err);
      return res.status(500).json({ error: err });
    }

    return res.status(200).json(result);
  });
};

const updateDog = (req, res) => {
  const { dogData } = req.body;

  const sql = `UPDATE dogs SET name = ?, age = ?, gender= ? WHERE id = ?`;
  const values = [dogData.name, dogData.age, dogData.gender, dogData.id];
  req.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user's dog:", err);
      return res.status(500).json({ error: "Failed to update user's dog" });
    }
    console.log("Dog updated successfully", result);

    return res.status(200).json(result);
  });
};

const updateCurrentPark = (req, res) => {
  const { dogId } = req.params;
  const { parkId } = req.body;
  const sql = `UPDATE dogs
  SET current_parkId = ?
  WHERE id = ?;`;
  const values = [parkId, dogId];

  req.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding dog to park:", err);
      res.status(500).json({ error: "Failed to add dog to park" });
    } else {
      console.log("Dog added to the park successfully");
      res.status(200).json({ message: "Dog added successfully" });
    }
  });
};

export default {
  addDog,
  uploadDogImage,
  deleteDog,
  getUserDogs,
  updateDog,
  updateCurrentPark,
  getDog,
};
