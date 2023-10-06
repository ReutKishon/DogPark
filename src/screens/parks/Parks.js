import { Text, View, ScrollView, SafeAreaView } from "react-native";
import styles from "./parks.style";
import { ParkCard } from "../../components";
import React, { useState, useEffect } from "react";
import parksData from "../../data/parks.json";
import { COLORS } from "../../constants";

const Parks = ({ navigation, route }) => {
  const { selectedDogs } = route.params;
  const [parks, setParks] = useState([]);

  useEffect(() => {
    setParks(parksData.parks);
  }, []);

  const navigateToParkDetails = (park) => {
    navigation.navigate("ParkDetails", { park, selectedDogs });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
            {parks?.map((park) => (
              <View key={park?.park_id}>
                <ParkCard
                  park={park}
                  handleNavigate={() => {
                    navigateToParkDetails(park);
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Parks;
