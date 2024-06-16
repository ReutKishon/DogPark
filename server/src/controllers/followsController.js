//@ts-nocheck

// const follow = (req, res) => {
//   const { userId, dogId } = req.params;
//   const db = req.db;
//   const sql = `INSERT INTO follows (user_id, dog_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP`;

//   db.query(sql, [userId, dogId], (err, result) => {
//     if (err) {
//       console.error("Error following:", err);
//       res.status(500).json({ error: "Failed to follow" });
//     } else {
//       console.log("followed successfully");
//       res.status(200).json({ message: "followed successfully" });
//     }
//   });
// };

// const unfollow = (req, res) => {
//   const { userId, dogId } = req.params;
//   const db = req.db;
//   const sql = "DELETE FROM follows WHERE user_id = ? AND dog_id = ?";
//   db.query(sql, [userId, dogId], (err, result) => {
//     if (err) {
//       console.error("Error unfollowing:", err);
//       res.status(500).json({ error: "Failed to ufollow" });
//     } else {
//       console.log("unfollowed successfully");
//       res.status(200).json({ message: "unfollowed successfully" });
//     }
//   });
// };

// const getFollowings = (req, res) => {
//   const { userId } = req.params;
//   console.log("here1");
//   const db = req.db;
//   console.log("here2");
//   const sql = "SELECT * FROM follows WHERE user_id = ?";
//   db.query(sql, [userId], (err, result) => {
//     if (err) {
//       res.status(500).json({ error: "Failed to get user followings" });
//     } else {
//       console.log(result);
//       return res.status(200).json({ result });
//     }
//   });
// };

// export default {
//   follow,
//   unfollow,
//   getFollowings,
// };
// followController.js
import Follow from '../models/followModel.js';

const follow = async (req, res) => {
  const { userId, dogId } = req.params;
  const newFollow = new Follow({user:userId, dog:dogId});
  try {
    await newFollow.save()
    res.status(200).json({ message: "Followed successfully" });
  } catch (err) {
    console.error("Error following:", err);
    res.status(500).json({ error: "Failed to follow" });
  }
};

const unfollow = async (req, res) => {
  const { userId, dogId } = req.params;

  try {
    await Follow.findOneAndDelete({ user: userId, dog: dogId });
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (err) {
    console.error("Error unfollowing:", err);
    res.status(500).json({ error: "Failed to unfollow" });
  }
};

const getFollowings = async (req, res) => {
  const { userId } = req.params;

  try {
    const followings = await Follow.find({ user: userId }).populate('dog');
    res.status(200).json(followings);
  } catch (err) {
    console.error("Error getting user followings:", err);
    res.status(500).json({ error: "Failed to get user followings" });
  }
};

export default {
  follow,
  unfollow,
  getFollowings,
};
