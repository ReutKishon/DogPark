import connection from "../db.js";

const addUser = (req, res) => {
  const { userData } = req.body;

  const sql = `INSERT INTO users (user_id,name,email) VALUES (?,?,?)`;
  const values = [userData.id, userData.name, userData.email];

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

export default {
  addUser,
};
