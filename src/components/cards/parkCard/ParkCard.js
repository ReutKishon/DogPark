import { Text, TouchableOpacity, Image, View } from "react-native";
import styles from "./parkCard.style";
import { checkImageURL } from "../../../utils";
import { COLORS, icons } from "../../../constants";
import { useState } from "react";

const ParkCard = ({ park, handleNavigate }) => {
  console.log("ParkCard " + park.dogs.length);
  const [dogsNumber, setDogsNumber] = useState(park.dogs.length);
  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={
            //uri: checkImageURL(dog.dog_image)
            //</TouchableOpacity>? dog.dog_image
            //:
            require("../../../assets/images/dogpark.jpg")
          }
          resizeMode="cover"
          style={styles.profileImage}
        ></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.parkName} numberOfLines={1}>
          {park.park_name}
        </Text>
        <View style={styles.iconBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.parkLocation}>{park.park_location}</Text>
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

/*
      
*/
export default ParkCard;
