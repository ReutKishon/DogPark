import { View, SafeAreaView, Text, Image } from "react-native";
import { DogsList, Button } from "../../components";
import { useState } from "react";
import styles from "./parkDetails.style";
import { icons } from "../../constants";
import { parksData, dogsData } from "../../data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ParkDetails = ({ navigation, route }) => {
  const { park, selectedDogs } = route.params;
  console.log("number of selected dogs " + selectedDogs.length);
  const [dogsInThePark, setDogsInThePark] = useState(park.dogs);
  console.log("number of dogs playing in the park " + dogsInThePark.length);

  const filterSelectedDogs = (selectedDogs, parkDogs) => {
    const parkDogIds = parkDogs.map((dog) => parseInt(dog.dog_id, 10));

    const filteredDogs = selectedDogs.filter((selectedDog) => {
      return !parkDogIds.includes(parseInt(selectedDog, 10));
    });
    console.log("filteredDogs:  ", filteredDogs);
    return filteredDogs;
  };

  const mapDogIdsToDogs = (dogIds, dogData) => {
    const mappedDogs = [];

    for (const dogId of dogIds) {
      const dog = dogData.find((dog) => dog.dog_id === dogId);
      if (dog) {
        mappedDogs.push(dog);
      }
    }

    return mappedDogs;
  };

  const updateParkData = async (parkIdToUpdate) => {
    try {
      const parkIndex = parksData.parks.findIndex(
        (park) => park.park_id === parkIdToUpdate
      );

      const updatedDogs = filterSelectedDogs(selectedDogs, park.dogs);
      const dogsToAdd = mapDogIdsToDogs(updatedDogs, dogsData.dogs);

      if (parkIndex !== -1) {
        parksData.parks[parkIndex].dogs = [
          ...(parksData.parks[parkIndex].dogs || []),
          ...dogsToAdd,
        ];

        await AsyncStorage.setItem("parksData", JSON.stringify(parksData));
        setDogsInThePark(parksData.parks[parkIndex].dogs);
        console.log("Park updated successfully.");
      } else {
        console.error("Park not found.");
      }
    } catch (error) {
      console.error("Error updating park data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.infoContainer}>
        <Text style={styles.parkName}>{park.park_name}</Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.parkLocation}>{park.park_location}</Text>
        </View>
      </View>
      <View style={{ maxHeight: 580 }}>
        <DogsList navigation={navigation} dogs={dogsInThePark} />
      </View>
      <View style={styles.footContainer}>
        <Button
          buttonText="Play"
          onPress={() => {
            updateParkData(park?.park_id);
          }}
          buttonSize={{ width: 300, height: 50 }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default ParkDetails;
