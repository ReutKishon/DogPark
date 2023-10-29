import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getDogsPark } from "../../utils/parkDataOperations";

const Parks = () => {
  const [dogParks, setDogParks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogParks = async () => {
      const parks = await getDogsPark();
      console.log(parks);
      if (parks != undefined) {
        setDogParks(parks);
        setLoading(false);
      }
    };
    fetchDogParks();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text>Dog Parks Nearby:</Text>
      {dogParks.map((park, index) => (
        <View key={index}>
          <Text>name: {park.name}</Text>
          <Text>location: {park.vicinity}</Text>
        </View>
      ))}
    </View>
  );
};

export default Parks;
