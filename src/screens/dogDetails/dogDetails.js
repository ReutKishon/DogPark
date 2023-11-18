import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./dogDetails.style";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../constants";
import { Button } from "../../components";

const DogDetails = ({ route }) => {
  const { dog } = route.params;
  const updateDogDetails = () => {
    //await updateUserDog()
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            source={
              //uri: checkImageURL(dog.dog_image)
              //</TouchableOpacity>? dog.dog_image
              //:
              require("../../assets/images/golder-retriever-puppy.jpeg")
            }
            resizeMode="cover"
            style={styles.profileImage}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.dogName}>{dog.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="paw" size={20} color="#E52B50" />
          <Text style={styles.infoText}> {dog.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="paw" size={20} color="#E52B50" />
          <Text style={styles.infoText}>{dog.age} years old</Text>
        </View>
      </View>
    </View>
  );
};

export default DogDetails;
