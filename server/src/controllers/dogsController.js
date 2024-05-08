//@ts-nocheck
import connection from "../db.js";
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

  connection.query(sql, values, (err,result) => {
    if (err) {
      console.error("Error adding dog:", err);
      res.status(500).json({ error: "Failed to add dog" });
    } else {
      console.log("Dog added successfully");
      const insertedId = result.insertId; // Get the ID of the inserted row
      res.status(200).json({ message: "Dog added successfully",dogId: insertedId });
    }
  });
};

const getUserDogs = (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT * FROM dogs WHERE user_id =?`;
  const values = [userId];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error getting user's dogs:", err);
      return res.status(500).json({ error: "Failed to get user's dogs" });
    }

    return res.status(200).json(result);
  });
};

const updateDog = (req, res) => {
  const { dogrId } = req.params;
  const { dogData } = req.body;

  const sql = `UPDATE dogs SET name = ?, age = ?, lifeStage = ?, gender= ? WHERE dog_id = ?`;
  const values = [dogData.name, dogData.age, dogData.lifeStage, dogData.gender];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error getting user's dogs:", err);
      return res.status(500).json({ error: "Failed to get user's dogs" });
    }

    return res.status(200).json(result);
  });
};

export default {
  addDog,
  getUserDogs,
  updateDog,
};
