//@ts-nocheck
import User from '../models/userModel.js';

// const addUser = (req, res) => {
//   const { userData } = req.body;

//   const sql = `INSERT INTO users (user_id,name,email) VALUES (?,?,?)`;
//   const values = [userData.id, userData.name, userData.email];

//   connection.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding dog:", err);
//       res.status(500).json({ error: "Failed to add dog" });
//     } else {
//       console.log("Dog added successfully");
//       res.status(200).json({ message: "Dog added successfully" });
//     }
//   });
// };

// const getUser = (req, res) => {
//   const { userId } = req.params;
//   console.log("userId:", userId);
//   const sql = `SELECT * FROM users WHERE user_id=?`;

//   connection.query(sql, [userId], (err, result) => {
//     if (err) {
//       console.log("Error getting user:", err);
//       res.status(500).json({ error: "Failed to get user" });
//     } else {
//       return res.status(200).json(result);
//     }
//   });
// };



const getUser = async (req, res) => {
  const { userId } = req.params;
  console.log("reut:", userId,typeof userId);

  try {
    const user = await User.findById(String(userId));
    console.log("user:", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ error: "Failed to get user" });
  }
};

export default {
  
  getUser,
};

