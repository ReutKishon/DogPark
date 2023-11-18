// userDataOperations.js
import { firestore } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";

export const getUserData = async (userId) => {
  try {
    const userDoc = await firestore.collection("users").doc(userId).get();
    const userData = userDoc.data();
    return userData;
  } catch (error) {
    console.error("Error fetching user's data:", error);
    return null;
  }
};

export const AddDogToUser = async (userData, setUserData, dogData) => {
  console.log(userData);
  try {
    const docRef = await addDoc(collection(firestore, "dogs"), dogData);
    if (docRef && docRef.id) {
      if (docRef) {
        const newDogRef = docRef;

        await updateDoc(doc(firestore, "users", userData.id), {
          dogs: arrayUnion(newDogRef),
        });

        //console.log("newDogRef:" + newDogRef.id);
        const updatedUserData = { ...userData };
        updatedUserData.dogs.push(newDogRef);
        setUserData(updatedUserData);
      }
    } else {
      console.error("Invalid docRef or missing ID.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserDogs = async (userId) => {
  const userData = await getUserData(userId);
  if (userData) {
    const dogRefs = userData.dogs;
    if (!dogRefs) return null;
    const dogDataPromises = dogRefs.map(async (dogRef) => {
      try {
        const doc = await dogRef.get();
        if (doc && doc.data()) {
          let docData = doc.data();

          docData.key = dogRef.id;
          docData.isSelected = 0;
          return docData;
        }
        return null;
      } catch (error) {
        console.error("Error fetching dog data:", error);
        return null;
      }
    });
    const userDogsData = (await Promise.all(dogDataPromises)).filter(Boolean);
    return userDogsData;
  }
};

const getUserDogById = (userId, dogId) => {};

export const updateUserDog = (userId, dogId, updatedDetails) => {
  const userDog = doc(firestore, "users", userId, "dogs", dogId);
  console.log(userDog);
  if (userDog) {
    userDog.name = updatedDetails.name;
    userDog.age = updatedDetails.age;
    userDog.gender = updatedDetails.gender;

    return userDog;
  } else {
    throw new Error("User dog not found");
  }
};
