import axios from "axios";
import * as Location from "expo-location";
import { Park, LocationCoords } from "../types";
import { LOCATION_API_KEY } from "@env";

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
  }&radius=${1000}&type=park&keyword=dog%20park&key=${LOCATION_API_KEY}`;
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
        // dogsInPark: [],
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
