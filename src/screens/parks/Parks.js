import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getDogsPark } from "../../utils/parkDataOperations";
import { ParkCard } from "../../components";
import styles from "./parks.style";
const Parks = () => {
  const [dogParks, setDogParks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogParks = async () => {
      const parks = await getDogsPark();
      //console.log(parks);
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
    <View style={styles.cardsContainer}>
      {dogParks.map((park, index) => (
        <ParkCard park={park} key={index} />
      ))}
    </View>
  );
};

export default Parks;
