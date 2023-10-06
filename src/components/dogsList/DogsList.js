import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import styles from "./dogsList.style";
import { DogCard } from "../";
import React, { useState, useEffect } from "react";

const DogsList = ({ navigation, dogs }) => {
  const handleNavigate = (dog) => {
    navigation.navigate("DogDetails", { dog });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          {dogs?.map((dog) => (
            <DogCard
              dog={dog}
              key={dog?.dog_id}
              handleNavigate={() => {
                handleNavigate(dog);
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DogsList;
