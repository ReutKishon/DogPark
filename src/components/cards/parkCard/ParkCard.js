import { Text, TouchableOpacity, Image, View } from "react-native";
import styles from "./parkCard.style";
import { checkImageURL } from "../../../utils";
import { COLORS, icons } from "../../../constants";
import { useState, useEffect } from "react";
import { GetDistanceAndAddress } from "../../../utils/parkDataOperations";

const ParkCard = ({ navigation, park, selectedDogs }) => {
  const [parkId, setParkId] = useState("");
  const [dogsNumber, setDogsNumber] = useState(0);
  const [parkName, setParkName] = useState("");
  const [parkLocation, setParkLocation] = useState("");
  const [parkDistance, setParkDistance] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setParkName(park.name);
    setParkId(park.place_id);
    const fetchParkDistance = async () => {
      const parkLatitude = park.geometry.location.lat;
      const parkLongitude = park.geometry.location.lng;
      const destinations = parkLatitude + "," + parkLongitude;

      try {
        const { distance, address } = await GetDistanceAndAddress(
          destinations,
          park.name
        );
        setParkLocation(address);
        setParkDistance(distance);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching park distance", error);
      }
    };
    fetchParkDistance();
  }, []);

  const handleNavigate = () => {
    navigation.navigate("ParkDetails", {
      parkId,
      parkName,
      parkLocation,
      selectedDogs,
    });
  };

  if (isLoading) return;
  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.container}>
      <View style={styles.textContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.parkName} numberOfLines={1}>
            {parkName}
          </Text>
          <Text style={[styles.parkDistance, { marginTop: 3 }]}>
            {parkDistance} from you
          </Text>
        </View>
        <View style={styles.iconBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.parkLocation}>{parkLocation}</Text>
        </View>
        <View style={styles.iconBox}>
          <Image
            source={icons.dog}
            resizeMode="contain"
            style={styles.dogImage}
          />
          <Text style={styles.dogsNumber}>{dogsNumber}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ParkCard;
