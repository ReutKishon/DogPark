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

import { CreationData, Dog, LifeStage, User } from "./types";
import axios, { Axios } from "axios";
const PATH = "http://localhost:3000";

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

export const addDogToUser = async (
  userId: string,
  dogData: CreationData<Dog>
) => {
  try {
    console.log("age:" + dogData.age);
    const response = await axios.post(PATH + "/dogs/add", { dogData, userId });
    console.log(response.data);
  } catch (error) {
    console.error("error adding a dog " + error);
  }
};

export const getUserDogs = async (userId: string) => {
  console.log("getting user dogs", userId);
  try {
    const response = await axios.get(PATH + "/dogs/" + userId);
    const dogs = response.data;
    console.log(dogs);
    return dogs;
  } catch (err) {
    throw err;
  }
};

export const updateUserDog = async (dogData: Dog) => {
  const dogId = dogData.id;
  console.log("dogId:" + dogId);
  console.log(dogData);
  try {
    const response = await axios.put(PATH + "/dogs/update/" + dogId, dogData);
    console.log(response.data);
  } catch (error) {
    console.error("error updating a dog " + error);
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
    console.log("parkId:", parkId);
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
