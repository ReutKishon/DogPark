// userDataOperations.js
import { firestore } from "../../firebase";
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

export const getUser = async (id: string) => {
  try {
    const doc = await firestore.collection("users").doc(id).get();

    if (doc.exists) {
      const user = doc.data();
      user["id"] = id;
      return user;
    } else {
      console.log("No such document!");
    }
  } catch (error) {}
};

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

export const AddDogToUser = async (userId, dogData) => {
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

const API_KEY = "AIzaSyCnAEFDXfQTt0A4UYn5srE0jOGGrGfjEhk";

export const getUserLocation = async () => {
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
export const AddDogsToPark = async (parkId, dogKeys) => {
  const dogRefs = dogKeys.map((dogKey) => doc(firestore, "dogs", dogKey));

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

export const GetDogsInPark = async (parkId) => {
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
            return docData;
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
