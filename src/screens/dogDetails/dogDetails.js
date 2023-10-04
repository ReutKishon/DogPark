import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./dogDetails.style";

const DogDetails = ({ route }) => {
  const { dog } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.dogName}>{dog.dog_name}</Text>
      <TouchableOpacity style={styles.profileContainer}>
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
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.pointDot} />
          <Text style={styles.infoText}>gender: {dog.dog_gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.pointDot} />
          <Text style={styles.infoText}>notes: {dog.notes}</Text>
        </View>
      </View>
    </View>
  );
};

export default DogDetails;
