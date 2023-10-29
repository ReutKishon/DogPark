import axios from "axios";
import * as Location from "expo-location";

const API_KEY = "AIzaSyCnAEFDXfQTt0A4UYn5srE0jOGGrGfjEhk";

export const getDogsPark = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission not granted');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    
    let { latitude, longitude } = location.coords;
    console.log("Latitude:", latitude, "Longitude:", longitude);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=park&keyword=dog&key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching location: ", error);
    return error;
  }
};
