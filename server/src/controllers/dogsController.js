//@ts-nocheck
import User from "../models/userModel.js";
import Dog from "../models/dogModel.js";

const addDog = (req, res) => {
  const { dogData, userId } = req.body;

  // const sql = `INSERT INTO dogs (name,user_id,age,lifeStage,gender) VALUES (?,?,?,?,?)`;
  // const values = [
  //   dogData.name,
  //   userId,
  //   dogData.age,
  //   dogData.lifeStage,
  //   dogData.gender,
  // ];

  // connection.query(sql, values, (err, result) => {
  //   if (err) {
  //     console.error("Error adding dog:", err);
  //     res.status(500).json({ error: "Failed to add dog" });
  //   } else {
  //     console.log("Dog added successfully");
  //     const insertedId = result.insertId;
  //     uploadImageToImgur(dogData.imageUrl, insertedId);

  //     res
  //       .status(200)
  //       .json({ message: "Dog added successfully", dogId: insertedId });
  //   }
  // });
  try {
    const user =  User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newDog = new Dog({
      name: dogData.name,
      user_id: userId,
      age: dogData.age,
      lifeStage: dogData.lifeStage,
      gender: dogData.gender,
      current_parkId: dogData.current_parkId
    });

    newDog.save();
    console.log('Dog added successfully');

    res.status(200).json({ message: 'Dog added successfully', dogId: newDog._id });
  } catch (err) {
    console.error('Error adding dog:', err);
    res.status(500).json({ error: 'Failed to add dog' });
  }
};



const deleteDog = (req, res) => {
  const { dogId } = req.params;

  // const sql = `DELETE FROM dogs WHERE id = ?`;

  // connection.query(sql, [dogId], (err, result) => {
  //   if (err) {
  //     console.error("Error deleting dog:", err);
  //     res.status(500).json({ error: "Failed to delete dog" });
  //   } else {
  //     console.log("Dog deleted successfully");
  //     res.status(200).json({ message: "Dog deleted successfully" });
  //   }
  // });

  try {
    const deletedDog = Dog.findByIdAndDelete(dogId);
    if (!deletedDog) {
      return res.status(404).json({ error: 'Dog not found' });
    }
    res.status(200).json({ message: 'Dog deleted successfully' });
  } catch (err) {
    console.error('Error deleting dog:', err);
    res.status(500).json({ error: 'Failed to delete dog' });
  }
};

const getUserDogs = (req, res) => {
  const { userId } = req.params;
  // const sql = `SELECT * FROM dogs WHERE user_id =?`;
  // connection.query(sql, [userId], (err, result) => {
  //   if (err) {
  //     console.error("Error getting user's dogs:", err);
  //     return res.status(500).json({ error: "Failed to get user's dogs" });
  //   }

  //   return res.status(200).json(result);
  // });
  try {
    const dogs =  Dog.find({ user_id: userId });
    res.status(200).json(dogs);
  } catch (err) {
    console.error('Error getting user\'s dogs:', err);
    res.status(500).json({ error: 'Failed to get user\'s dogs' });
  }
};

const getDog = (req, res) => {
  const { dogId } = req.params;
// =
//   const sql = `SELECT * FROM dogs WHERE id =?`;
//   connection.query(sql, [dogId], (err, result) => {
//     if (err) {
//       console.error("Error getting dog:", err);
//       return res.status(500).json({ error: err });
//     }

//     return res.status(200).json(result);
//   });
try {
  const dog =  Dog.findById(dogId);
  if (!dog) {
    return res.status(404).json({ error: 'Dog not found' });
  }

  res.status(200).json(dog);
} catch (err) {
  console.error('Error getting dog:', err);
  res.status(500).json({ error: 'Failed to get dog' });
}
};

const updateDog = (req, res) => {
  const { dogData } = req.body;
  // const sql = `UPDATE dogs SET name = ?, age = ?, lifeStage = ?, gender= ? WHERE id = ?`;
  // const values = [
  //   dogData.name,
  //   dogData.age,
  //   dogData.lifeStage,
  //   dogData.gender,
  //   dogData.id,
  // ];
  // connection.query(sql, values, (err, result) => {
  //   if (err) {
  //     console.error("Error getting user's dogs:", err);
  //     return res.status(500).json({ error: "Failed to get user's dogs" });
  //   }
  //   return res.status(200).json(result);
  // });
  try {
    const updatedDog =  Dog.findByIdAndUpdate(dogData.id, {
      name: dogData.name,
      age: dogData.age,
      lifeStage: dogData.lifeStage,
      gender: dogData.gender
    }, { new: true });

    if (!updatedDog) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    uploadImageToImgur(dogData.imageUrl, dogData.id);
    res.status(200).json(updatedDog);
  } catch (err) {
    console.error('Error updating dog:', err);
    res.status(500).json({ error: 'Failed to update dog' });
  }
};

const updateCurrentPark = (req, res) => {
  const { dogId } = req.params;
  const { parkId } = req.body;
  // const sql = `UPDATE dogs
  // SET current_parkId = ?
  // WHERE id = ?;`;
  // const values = [parkId, dogId];

  // connection.query(sql, values, (err, result) => {
  //   if (err) {
  //     console.error("Error adding dog to park:", err);
  //     res.status(500).json({ error: "Failed to add dog to park" });
  //   } else {
  //     console.log("Dog added to the park successfully");
  //     res.status(200).json({ message: "Dog added successfully" });
  //   }
  // });
  try {
    const result =  Dog.updateOne(
      { _id: dogId }, 
      { $set: { current_parkId: parkId } } 
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: 'Dog not found or park is already the same' });
    }

    console.log('Dog age updated successfully');
    return res.status(200).json({ message: 'Dog current park updated successfully' });
  } catch (err) {
    console.error('Error updating dog current park:', err);
    return res.status(500).json({ error: 'Failed to update dog current park' });
  }
};



export default {
  addDog,
  deleteDog,
  getUserDogs,
  updateDog,
  updateCurrentPark,
  getDog,
};
