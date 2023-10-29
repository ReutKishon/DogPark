import { Text, TouchableOpacity, Image, View } from "react-native";
import styles from "./dogCard.style";
import { checkImageURL } from "../../../utils";
import { COLORS } from "../../../constants";

const DogCard = ({ dog, handleNavigate }) => {
  //console.log("iaSelected " + isSelected);
  return (
    <TouchableOpacity
      onPress={handleNavigate}
      style={[styles.container, dog.isSelected && styles.selectedContainer]}
    >
      <View style={styles.profileContainer}>
        <Image
          source={require("../../../assets/images/golder-retriever-puppy.jpeg")}
          resizeMode="cover"
          style={styles.profileImage}
        ></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.dogName} numberOfLines={1}>
          {dog.name}
        </Text>
        <Text style={styles.dogGender}>{dog.gender}</Text>
        <Text style={styles.dogGender}>{dog.age} years old</Text>
      </View>
    </TouchableOpacity>
  );
};


export default DogCard;
