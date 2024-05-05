import connection from "../db.js";

const addDog = (req, res) => {
  const { dogData, userId } = req.body;

  const sql = `INSERT INTO dogs (name,user_id) VALUES (?,?)`;
  const values = [dogData.name, userId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding dog:", err);
      res.status(500).json({ error: "Failed to add dog" });
    } else {
      console.log("Dog added successfully");
      res.status(200).json({ message: "Dog added successfully" });
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
      res.status(500).json({ error: "Failed to get user's dogs" });
    } else {
      console.log("retrieve user's dogs successfully");
      res.status(200).json({ message: "retrieve user's dogs successfully" });
    }
  });
};

export default {
  addDog,
  getUserDogs,
};
