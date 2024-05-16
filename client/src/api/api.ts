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

export const AddDogToPark = async (parkId: string, dogId: string) => {
  try {
    console.log("dogId:" + dogId);
    const response = await axios.put(PATH + "/parks/add/" + dogId, { parkId });
    console.log("heyyy" + response.data);
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

export const getDogsInPark = async (parkId: string): Promise<Array<Dog>> => {
  try {
    const response = await axios.get(PATH + "/parks/" + parkId);
    const dogs = response.data;
    return dogs;
    console.log("playing:" + response.data.length);
  } catch (error) {
    console.error("Error fetching dog data:", error);
    return null;
  }
};
