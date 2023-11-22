import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getNearestDogParks } from "../../api/parkDataOperations";
import { ParkCard } from "../../components";
import styles from "./parks.style";
const Parks = ({ navigation, route }) => {
  const { selectedDogs } = route.params || {};
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearestParks = async () => {
      const nearestParks = await getNearestDogParks();
      //console.log(nearestParks);
      if (nearestParks) {
        setParks(nearestParks);
        setLoading(false);
      }
    };
    fetchNearestParks();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.cardsContainer}>
      {parks.map((park, index) => (
        <ParkCard
          navigation={navigation}
          park={park}
          key={index}
          selectedDogs={selectedDogs}
        />
      ))}
    </View>
  );
};

export default Parks;
