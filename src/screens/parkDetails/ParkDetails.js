import { View, SafeAreaView, Text, Image } from "react-native";
import { DogsList, Button } from "../../components";
import { useEffect, useState } from "react";
import styles from "./parkDetails.style";
import { icons } from "../../constants";
import {
  AddDogsToPark,
  GetDogsInPark,
  RemoveDogsFromPark,
} from "../../api/parkDataOperations";

const ParkDetails = ({ navigation, route }) => {
  const { parkId, parkName, parkLocation, selectedDogs } = route.params || {};
  const [dogsInThePark, setDogsInThePark] = useState([]);
  const [play, SetPlay] = useState(1);

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
    if (play) {
      await AddDogsToPark(parkId, selectedDogsRefs);
    } else {
      await RemoveDogsFromPark(parkId, selectedDogsRefs);
    }
    const updatedParkDogs = await GetDogsInPark(parkId);
    setDogsInThePark(updatedParkDogs);
    SetPlay(!play);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          buttonText={play ? "Play" : "Leave"}
          onPress={handlePlayPress}
          buttonSize={{ width: 300, height: 50 }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default ParkDetails;
