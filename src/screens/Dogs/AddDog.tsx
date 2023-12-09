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
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../constants";
import { AddDogToUser } from "../../api/api";
import { useStore } from "../../store";
import { IconButton } from "react-native-paper";
import { useAddDog } from "../../api/queries";

const GENDER = ["Male", "Female"];

const AddDogView = ({ onClose }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<DogGender>();
  const [imageUrl, setImageUrl] = useState(null);
  const addDogMutation = useAddDog();

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
        }
      }
    } catch (error) {}
  };

  const onAddDogSubmit = async () => {
    try {
      if (!name || !age || !gender) {
      } else {
        const dogData: Dog = {
          name,
          age,
          gender,
          imageUrl,
        };

        await addDogMutation.mutateAsync(dogData);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex items-center px-4 gap-2">
      <View className="w-full flex-row justify-between items-center">
        <Button onPress={() => onClose()}>Cancel</Button>
        <Button
          icon={"plus"}
          mode="contained"
          onPress={onAddDogSubmit}
          loading={addDogMutation.isLoading}
        >
          Add dog
        </Button>
      </View>

      <TouchableOpacity onPress={pickImage}>
        <Avatar.Image
          style={{ backgroundColor: "grey" }}
          size={120}
          source={{ uri: imageUrl }}
        ></Avatar.Image>
      </TouchableOpacity>

      <View className="gap-5 w-full  ">
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
    </View>
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
});
export default AddDogView;
