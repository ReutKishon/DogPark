import { View, SafeAreaView, Text, Image } from "react-native";
import { DogsList, Button } from "../../components";
import { useEffect, useState } from "react";
import styles from "./parkDetails.style";
import { icons } from "../../constants";
import { AddDogsToPark, GetDogsInPark } from "../../utils/parkDataOperations";
const ParkDetails = ({ navigation, route }) => {
  const { parkId, parkName, parkLocation, selectedDogs } = route.params || {};
  const [dogsInThePark, setDogsInThePark] = useState([]);

  useEffect(() => {
    const fetchDogsInPark = async () => {
      const dogs = await GetDogsInPark(parkId);
      if (dogs != undefined) {
        setDogsInThePark(dogs);
      }
    };

    fetchDogsInPark();
  }, []);

  console.log("dogsInThePark: " + JSON.stringify(dogsInThePark));
  const handleDogPress = (dog) => {
    navigation.navigate("DogDetails", { dog });
  };
  const handlePlayPress = async () => {
    const selectedDogsRefs = selectedDogs.map((dog) => dog.key);

    await AddDogsToPark(parkId, selectedDogsRefs);
    const updatedParkDogs = await GetDogsInPark(parkId);
    setDogsInThePark(updatedParkDogs);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.infoContainer}>
        <Text style={styles.parkName}>{parkName}</Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.parkLocation}>{parkLocation}</Text>
        </View>
      </View>
      <View style={{ maxHeight: 580 }}>
        <DogsList dogs={dogsInThePark} handleDogPress={handleDogPress} />
      </View>
      <View style={styles.footContainer}>
        <Button
          buttonText="Play"
          onPress={handlePlayPress}
          buttonSize={{ width: 300, height: 50 }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default ParkDetails;
