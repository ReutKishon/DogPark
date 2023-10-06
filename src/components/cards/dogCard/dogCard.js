import { Text, TouchableOpacity, Image, View } from "react-native";
import styles from "./dogCard.style";
import { checkImageURL } from "../../../utils";
import { COLORS } from "../../../constants";

const DogCard = ({ dog, isSelected, handleNavigate }) => {
  console.log("iaSelected " + isSelected);
  return (
    <TouchableOpacity
      onPress={handleNavigate}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <View style={styles.profileContainer}>
        <Image
          source={
            //uri: checkImageURL(dog.dog_image)
            //</TouchableOpacity>? dog.dog_image
            //:
            require("../../../assets/images/golder-retriever-puppy.jpeg")
          }
          resizeMode="cover"
          style={styles.profileImage}
        ></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.dogName} numberOfLines={1}>
          {dog.dog_name}
        </Text>
        <Text style={styles.dogGender}>{dog.dog_gender}</Text>
      </View>
    </TouchableOpacity>
  );
};

/*
      
*/
export default DogCard;
