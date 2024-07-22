import axios from "axios";
import * as Location from "expo-location";
import { Park, LocationCoords } from "../types";

const API_KEY = "AIzaSyCnAEFDXfQTt0A4UYn5srE0jOGGrGfjEhk";
//const API_KEY = "AIzaSyC0uwBYSX6PD3eTkyhzf1Fq4heW0Ayz5Og"
export const getUserLocation = async (): Promise<LocationCoords> => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status: " + status);
    if (status !== "granted") {
      console.log("Location permission not granted");
      return;
    }
    let locationData = await Location.getCurrentPositionAsync({});
    const location: LocationCoords = {
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude,
    };
    return location;
  } catch (error) {
    console.error("Error fetching location: ", error);
    return error;
  }
};

export const GetDistance = async (destinations) => {
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

      //const distanceMeters= data.rows[0].elements[0].distance.value;
      //console.log(`Distance: ${distanceKm}`);
      //console.log(`Distance in meters: ${distanceMeters}`);
      return distance;
    } else {
      console.error("Invalid data received from Google Maps API");
    }
  } catch (error) {
    console.error("Error fetching data from Google Maps API", error);
    throw error;
  }
};

export const getNearestDogParks = async (
  location: LocationCoords
): Promise<Park[]> => {
  //const { longitude, latitude } = location;
  //const latitude = 31.88035; // Example latitude (London, UK)
  //const longitude = 34.81082; // Example longitude (London, UK)

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
    location.latitude
  },${
    location.longitude
  }&radius=${1000}&type=park&keyword=dog%20park&key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    //console.log(response.data);
    const parks: Park[] = response.data.results.map((park: any) => {
      const parkLat = park.geometry.location.lat;
      const parkLng = park.geometry.location.lng;
      const parkInfo: Park = {
        placeId: park.place_id,
        name: park.name || "Dog Park",
        address: park.vicinity,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          parkLat,
          parkLng
        ),
        locationCoords: {
          latitude: parkLat,
          longitude: parkLng,
        },
        dogsInParkIds: [],
      };
      return parkInfo;
    });

    // console.log(parks);
    return parks;
  } catch (error) {
    console.error("Error retrieving data from Overpass API:", error);
    return [];
  }
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

// Function to calculate distance between two coordinates using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371e3; // Earth's radius in meters
  const phi1 = (lat1 * Math.PI) / 180; // Convert latitude to radians
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = Math.round(earthRadius * c); // Distance in meters
  return distance;
}
