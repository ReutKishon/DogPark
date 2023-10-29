import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Location from "expo-location";
import { View, Text } from "react-native";

const API_KEY = "AIzaSyCnAEFDXfQTt0A4UYn5srE0jOGGrGfjEhk";
//const LATITUDE = "YOUR_USERS_LATITUDE";
//const LONGITUDE = "YOUR_USERS_LONGITUDE";

const Parks = () => {
  const [dogParks, setDogParks] = useState([]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        let location = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = location.coords;
        console.log("Latitude:", latitude, "Longitude:", longitude);
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=park&keyword=dog&key=${API_KEY}`
        );
        setDogParks(response.data.results);
      } catch (error) {
        console.error("Error fetching location: ", error);
        // Handle error
      }
    };

    getCurrentLocation();
  }, []);

  return (
    <View>
      <Text>Dog Parks Nearby:</Text>
      {dogParks.map((park, index) => (
        <View key={index}>
          <Text>{park.name}</Text>
          <Text>{park.vicinity}</Text>
        </View>
      ))}
    </View>
  );
};

export default Parks;
