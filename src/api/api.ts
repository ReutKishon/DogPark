import { firestore } from "../../firebase";

import {
  collection,
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { CreationData, Dog, User } from "./types";

export const getUser = async (id: string): Promise<User> => {
  try {
    const doc = await firestore.collection("users").doc(id).get();

    if (doc.exists) {
      return {
        ...doc.data(),
        dogs: [],
      } as User;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const AddDogToUser = async (
  userId: string,
  dogData: CreationData<Dog>
) => {
  try {
    const newDogRef = firestore.collection("dogs").doc();
    const dog: Dog = {
      ...dogData,
      id: newDogRef.id,
    };
    await newDogRef.set(dog);
    await updateDoc(doc(firestore, "users", userId), {
      dogs: arrayUnion(newDogRef),
    });
  } catch (error) {
    console.error(error + "hi");
  }
};

export const getUserDogs = async (userId) => {
  console.log("getting user dogs", userId);
  const userDoc = await firestore.collection("users").doc(userId).get();
  if (!userDoc || !userDoc.exists) {
    return [];
  }
  console.log("getting user dogs");

  const dogRefs = userDoc.data().dogs;
  console.log("dogRefs: " + dogRefs);
  if (!dogRefs) return [];
  const dogDataPromises = dogRefs.map(async (dogRef) => {
    try {
      const doc = await dogRef.get();
      if (doc && doc.data()) {
        let docData = doc.data();
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
};

export const updateUserDog = (userId, dogId, dogData) => {
  const userDog = doc(firestore, "users", userId, "dogs", dogId);
  if (userDog) {
    updateDoc(userDog, dogData);
    return userDog;
  } else {
    throw new Error("User dog not found");
  }
};

export const AddDogsToPark = async (parkId, dogIds) => {
  const dogRefs = dogIds.map((dogId) => doc(firestore, "dogs", dogId));

  try {
    const parkDocRef = doc(collection(firestore, "parks"), parkId);
    const parkDocSnapshot = await getDoc(parkDocRef);
    if (parkDocSnapshot.exists()) {
      await updateDoc(parkDocRef, {
        currentDogs: arrayUnion(...dogRefs),
      });
      console.log("Dogs added to existing park document.");
    } else {
      await setDoc(parkDocRef, { currentDogs: dogRefs });
      console.log("New park document created with dogs added.");
    }
  } catch (error) {
    console.error("Error adding dogs to park:", error);
  }
};

export const removeDogsFromPark = async (parkId, dogKeys) => {
  const dogRefs = dogKeys.map((dogKey) => doc(firestore, "dogs", dogKey));
  try {
    const parkDocRef = doc(collection(firestore, "parks"), parkId);

    await updateDoc(parkDocRef, {
      currentDogs: arrayRemove(...dogRefs),
    });
  } catch (error) {
    console.error("Error removing dogs from park:", error);
  }
};

export const getDogsInPark = async (parkId): Promise<Array<Dog>> => {
  try {
    console.log("parkId:",parkId)
    const parkDoc = await firestore.collection("parks").doc(parkId).get();
    const parkData = parkDoc.data();
    if (parkData) {
      const dogRefs = parkData.currentDogs;
      const dogDataPromises = dogRefs.map(async (dogRef) => {
        try {
          const doc = await dogRef.get();
          return doc.data();
        } catch (error) {
          console.error("Error fetching dog data:", error);
          return null;
        }
      });

      const parkDogsData = (await Promise.all(dogDataPromises)).filter(Boolean);
      return parkDogsData;
    }
  } catch (error) {
    console.error("Error fetching park data:", error);
    return null;
  }
};

export const writeFollowingDocument = async (
  currentUserId: string,
  userIdToFollow: string
): Promise<void> => {
  try {
    const followingDocRef = firestore
      .collection("following")
      .doc(currentUserId);
    await followingDocRef.update({
      following: arrayUnion(userIdToFollow),
    });
  } catch (error) {
    console.error("Error writing to following collection:", error);
  }
};

export const writeFollowersDocument = async (
  currentUserId: string,
  userIdToFollow: string
): Promise<void> => {
  try {
    const followingDocRef = firestore
      .collection("followers")
      .doc(userIdToFollow);
    await followingDocRef.update({
      followers: arrayUnion(currentUserId),
    });
  } catch (error) {
    console.error("Error writing to followers collection:", error);
  }
};
