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
    console.log("fetching userId:" + userId);
    const userDoc = await firestore.collection("users").doc(userId).get();
    const userData = userDoc.data();
    return userData;
  } catch (error) {
    console.error("Error fetching user's data:", error);
    return null;
  }
};

export const AddDogToUser = async (userId, userDogs, dogData) => {
  console.log(userId);
  try {
    const docRef = await addDoc(collection(firestore, "dogs"), dogData);
    if (docRef && docRef.id) {
      const newDogRef = docRef;

      await updateDoc(doc(firestore, "users", userId), {
        dogs: arrayUnion(newDogRef),
      });

      // const updatedUserDogs =
      //   userDogs === undefined ? [newDogRef] : { ...userDogs, newDogRef };
      // console.log("updatedUserDogs: " + updatedUserDogs);
    } else {
      console.error("Invalid docRef or missing ID.");
    }
  } catch (error) {
    console.error(error + "hi");
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
