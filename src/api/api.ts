// userDataOperations.js
import { firestore, storage } from "../../firebase";

import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import * as Location from "expo-location";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { User } from "./types";

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

export const AddDogToUser = async (userId: string, dogData: Dog) => {
  console.log("adding dog to user");
  try {
    const docRef = await addDoc(collection(firestore, "dogs"), dogData);
    if (docRef && docRef.id) {
      const newDogRef = docRef;

      await updateDoc(doc(firestore, "users", userId), {
        dogs: arrayUnion(newDogRef),
      });
    } else {
      console.error("Invalid docRef or missing ID.");
    }
  } catch (error) {
    console.error(error + "hi");
  }
};

export const getUserDogs = async (userId) => {
  console.log("getting user dogs", userId);
  const userDoc = await firestore.collection("users").doc(userId).get();
  if (!userDoc || !userDoc.exists) {
    return null;
  }
  console.log("getting user dogs");

  const dogRefs = userDoc.data().dogs;
  console.log("dogRefs: " + dogRefs);
  if (!dogRefs) return null;
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

const API_KEY = "AIzaSyCnAEFDXfQTt0A4UYn5srE0jOGGrGfjEhk";
export const getUserLocation = async (): Promise<Location.LocationObject> => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission not granted");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    return location;
  } catch (error) {
    console.error("Error fetching location: ", error);
    return error;
  }
};

export const getNearestDogParks = async (location) => {
  const { longitude, latitude } = location;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=park&keyword=dog&key=${API_KEY}`
  );
  return response.data.results;
};

export const GetDistanceAndAddressByLocation = async (destinations, name) => {
  try {
    const location = await getUserLocation();
    const origins = location[0] + "," + location[1];
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;
    //console.log("data:" + JSON.stringify(data));
    if (
      data.rows &&
      data.rows.length > 0 &&
      data.rows[0].elements &&
      data.rows[0].elements.length > 0
    ) {
      const distance = data.rows[0].elements[0].distance.text;
      let address = data.destination_addresses[0];

      if (address) {
        const firstSubstring = address.split(",")[0];
        if (firstSubstring == name) {
          address = address.substring(firstSubstring.length + 1);
        }
      }

      //const distanceMeters= data.rows[0].elements[0].distance.value;
      //console.log(`Distance: ${distanceKm}`);
      //console.log(`Distance in meters: ${distanceMeters}`);
      return { distance, address };
    } else {
      console.error("Invalid data received from Google Maps API");
    }
  } catch (error) {
    console.error("Error fetching data from Google Maps API", error);
    throw error;
  }
};

export const GetDistanceAndAddress = async (destinations, name) => {
  try {
    const location = await getUserLocation();
    const origins = location[0] + "," + location[1];
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;
    //console.log("data:" + JSON.stringify(data));
    if (
      data.rows &&
      data.rows.length > 0 &&
      data.rows[0].elements &&
      data.rows[0].elements.length > 0
    ) {
      const distance = data.rows[0].elements[0].distance.text;
      let address = data.destination_addresses[0];

      if (address) {
        const firstSubstring = address.split(",")[0];
        if (firstSubstring == name) {
          address = address.substring(firstSubstring.length + 1);
        }
      }

      //const distanceMeters= data.rows[0].elements[0].distance.value;
      //console.log(`Distance: ${distanceKm}`);
      //console.log(`Distance in meters: ${distanceMeters}`);
      return { distance, address };
    } else {
      console.error("Invalid data received from Google Maps API");
    }
  } catch (error) {
    console.error("Error fetching data from Google Maps API", error);
    throw error;
  }
};

// if park contains already dogs so add the dogs to that park document
// else add a new park document and add the dogs to that park document
export const JoinDogsToPark = async (parkId, userId, dogIds) => {
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

export const RemoveDogsFromPark = async (parkId, dogKeys) => {
  const dogRefs = dogKeys.map((dogKey) => doc(firestore, "dogs", dogKey));
  try {
    const parkDocRef = doc(collection(firestore, "parks"), parkId);

    await updateDoc(parkDocRef, {
      currentDogs: arrayRemove(...dogRefs),
    });
    const updatedParkDoc = await getDoc(parkDocRef);
    const updatedParkData = updatedParkDoc.data();
    if (
      !updatedParkData.currentDogs ||
      updatedParkData.currentDogs.length === 0
    ) {
      await deleteDoc(parkDocRef);
    }
  } catch (error) {
    console.error("Error removing dogs from park:", error);
  }
};

export const GetDogsInPark = async (parkId): Promise<Array<Dog>> => {
  try {
    const parkDoc = await firestore.collection("parks").doc(parkId).get();
    const parkData = parkDoc.data();
    if (parkData) {
      const dogRefs = parkData.currentDogs;
      const dogDataPromises = dogRefs.map(async (dogRef) => {
        try {
          const doc = await dogRef.get();
          if (doc && doc.data()) {
            let docData = doc.data();

            docData.key = dogRef.id;
            docData.isSelected = 0;
            const dog: Dog = {
              id: docData.key,
              name: docData.name,
              age: docData.age,
              gender: docData.gender,
              imageUri: docData.imageUrl || "",
              owner: docData.owner || "",
            };
            return dog;
          }
          return null;
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

export const UploadImageToStorage = async (id: string, imagePath: Blob) => {
  try {
    const path = "images/" + id;
    await storage.ref(path).put(imagePath);

    const url = await storage.ref(path).getDownloadURL();

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const pickImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        return result.assets[0].uri;
      }
    }
  } catch (error) {
    console.error("error: " + error);
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
