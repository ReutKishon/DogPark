import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import styles from "./dogsList.style";
import React, { useState, useEffect } from "react";
import DogCard from "../cards/dogCard/dogCard";

const DogsList = ({ dogs, handleDogPress }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          {dogs?.map((dog) => (
            <DogCard
              dog={dog}
              key={dog?.key}
              handleNavigate={() => {
                handleDogPress(dog);
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DogsList;
