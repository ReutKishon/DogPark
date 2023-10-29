import { View, SafeAreaView, Text, Image } from "react-native";
import { DogsList, Button } from "../../components";
import { useState } from "react";
import styles from "./parkDetails.style";
import { icons } from "../../constants";
import { AsyncStorage } from "react-native";

const ParkDetails = ({ navigation, route }) => {
  const { park, selectedDogs } = route.params;
  const [dogsInThePark, setDogsInThePark] = useState(park.dogs);

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
      const jsonData = await AsyncStorage.getItem("parksData");
      if (jsonData !== null) {
        const data = JSON.parse(jsonData);
        console.log(data);
      } else {
        const dataObj = {
          parks: [
            {
              park_id: 1,
              park_name: "Yuvel Park",
              park_location: "Derech Jerusalem,Rehovot",
              dogs: [
                {
                  dog_id: 1,
                  dog_name: "Buddy",
                  dog_age: 3,
                  dog_gender: "male",
                  notes: "Friendly and energetic",
                },
              ],
            },
          ],
        };

        const jsonData = JSON.stringify(dataObj);
        await AsyncStorage.setItem("parksData", jsonData);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }

    /*
        const parkIndex = data.parks.findIndex(
      (park) => park.park_id === parkIdToUpdate
    );
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
        route.params.updateParksData(parksData.parks);
        console.log("Park updated successfully.");
      } else {
        console.error("Park not found.");
      }
    } catch (error) {
      console.error("Error updating park data:", error);
    }
    */
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
