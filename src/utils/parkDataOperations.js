import axios from "axios";
import * as Location from "expo-location";
import { firestore } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";

const API_KEY = "AIzaSyCnAEFDXfQTt0A4UYn5srE0jOGGrGfjEhk";

export const getUserLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission not granted");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;
    return [latitude, longitude];
  } catch (error) {
    console.error("Error fetching location: ", error);
    return error;
  }
};

export const getNearestDogParks = async () => {
  const location = await getUserLocation();
  //console.log("Latitude:", location[0], "Longitude:", location[1]);
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location[0]},${location[1]}&radius=1000&type=park&keyword=dog&key=${API_KEY}`
  );
  return response.data.results;
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
    throw error; // Re-throw the error to be caught by the caller
  }
};

// if park contains already dogs so add the dogs to that park document
// else add a new park document and add the dogs to that park document
export const AddDogsToPark = async (parkId, dogs) => {
  console.log("selectedDogs: " + JSON.stringify(dogs));
  const parkDocRef = doc(collection(firestore, "parks"), parkId);
  try {
    const parkDocSnapshot = await getDoc(documentRef);
    if (parkDocSnapshot.exists()) {
      await updateDoc(parkDocRef, {
        currentDogs: arrayUnion(...dogs),
      });
      console.log("Dogs added to existing park document.");
    } else {
      await setDoc(parkDocRef, { currentDogs: dogs });
      console.log("New park document created with dogs added.");
    }
  } catch (error) {
    console.error("Error adding dogs to park:", error);
  }
};

export const GetDogsInPark = async (parkId) => {
  try {
  } catch {}
};
