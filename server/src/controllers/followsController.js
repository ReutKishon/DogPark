//@ts-nocheck

const follow = (req, res) => {
  const { userId, dogId } = req.params;
  const db = req.db;
  const sql = `INSERT INTO follows (user_id, dog_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP`;

  db.query(sql, [userId, dogId], (err, result) => {
    if (err) {
      console.error("Error following:", err);
      res.status(500).json({ error: "Failed to follow" });
    } else {
      console.log("followed successfully");
      res.status(200).json({ message: "followed successfully" });
    }
  });
};

const unfollow = (req, res) => {
  const { userId, dogId } = req.params;
  const db = req.db;
  const sql = "DELETE FROM follows WHERE user_id = ? AND dog_id = ?";
  db.query(sql, [userId, dogId], (err, result) => {
    if (err) {
      console.error("Error unfollowing:", err);
      res.status(500).json({ error: "Failed to ufollow" });
    } else {
      console.log("unfollowed successfully");
      res.status(200).json({ message: "unfollowed successfully" });
    }
  });
};

const getFollowings = (req, res) => {
  const { userId } = req.params;
  const db = req.db;
  const sql = "SELECT * FROM follows WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to get user followings" });
    } else {
      res.status(200).json({ message: "Getting user followings successfully" });
    }
  });
};

export default {
  follow,
  unfollow,
  getFollowings,
};
