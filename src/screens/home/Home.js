import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styles from "./home.style";
import { DogCard, Button } from "../../components";
import React, { useState, useEffect } from "react";
import dogsData from "../../data/dogs.json";
import { COLORS } from "../../constants";

const Home = ({ navigation }) => {
  const [dogs, setDogs] = useState([]);
  const [selectedDogs, setSelectedDogs] = useState([]);

  useEffect(() => {
    setDogs(dogsData.dogs);
  }, []);

  const toggleDogSelection = (dogId) => {
    setSelectedDogs((prevSelectedDogs) =>
      prevSelectedDogs.includes(dogId)
        ? prevSelectedDogs.filter((selectedDog) => selectedDog !== dogId)
        : [...prevSelectedDogs, dogId]
    );
  };
  const navigateToParks = () => {
    navigation.navigate("Parks", { selectedDogs });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
            {dogs?.map((dog) => (
              <View key={dog?.dog_id}>
                <DogCard
                  dog={dog}
                  isSelected={selectedDogs.includes(dog.dog_id)}
                  handleNavigate={() => {
                    toggleDogSelection(dog?.dog_id);
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footContainer}>
        <Button
          buttonText="Let's go"
          onPress={navigateToParks}
          buttonSize={{ width: 300, height: 50 }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;
