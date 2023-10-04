import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import styles from "./mydogs.style";
import { DogCard } from "../../components";
import React, { useState, useEffect } from "react";
import dogsData from "../../data/dogs.json";
const MyDogs = ({ navigation }) => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    setDogs(dogsData.dogs);
  }, []);

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

export default MyDogs;
