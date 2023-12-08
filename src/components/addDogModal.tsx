import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants";
import { AddDogToUser } from "../utils/userDataOperations";
import { useStore } from "../store";
import { IconButton } from "react-native-paper";


const GENDER = ["Male", "Female"];

const AddDogModal = ({ modalVisible, toggleAddDogModal }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const user = useStore((state) => state.user);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          `Sorry, we need camera  
             roll permission to upload images.`
        );
      } else {
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
          setImageUrl(result.assets[0].uri);

          setError(null);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onAddDogSubmit = async () => {
    try {
      if (!name || !age || !gender) {
        setError("Please fill in all fields");
      } else {
        const dogData = {
          name,
          age,
          gender,
          imageUrl,
        };

        await AddDogToUser(user.id, dogData);
        toggleAddDogModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType={"slide"} transparent={false} visible={modalVisible}>
      <View className="flex-1 p-20 items-center">
        <IconButton
          icon={"close"}
          size={18}
          mode="contained"
          onPress={toggleAddDogModal}
          style={{ position: "absolute", right: 20, top: 40 }}
        />
        <Text className="text-2xl font-bold2 mb-10">New dog</Text>
        <View className="gap-5 mb-20">
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose Image</Text>
        </TouchableOpacity>

        {imageUrl ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
        ) : (
          <Text style={styles.errorText}>{error}</Text>
        )}
        <Button mode="contained" onPress={onAddDogSubmit}>
          Add
        </Button>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
  input: {
    width: 300,
    height: 60,
    padding: 15,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 100,
  },
});
export default AddDogModal;
