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
import DropDown from "react-native-paper-dropdown";
import { COLORS } from "../../constants";
import { AddDogToUser } from "../../api/api";
import { useStore } from "../../store";
import { IconButton } from "react-native-paper";
import { useAddDog, usePickImage, useUploadImage } from "../../api/queries";
import { SelectList } from "react-native-dropdown-select-list";
const GENDER = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];
const AddDogView = ({ onClose }) => {
  const [dogName, setDogName] = useState<string>();
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<DogGender>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [showDropDown, setShowDropDown] = useState(false);
  const pickImageMutation = usePickImage();
  const uploadImageMutation = useUploadImage();
  const addDogMutation = useAddDog();

  const onAddDogSubmit = async () => {
    const response = await fetch(pickImageMutation.data);
    const imageUrl = await response.blob();
    const uri = await uploadImageMutation.mutateAsync(imageUrl);

    try {
      if (!dogName || !age || !gender) {
      } else {
        const dogData: Dog = {
          name: dogName,
          age,
          gender,
          imageUrl: uri,
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

      <TouchableOpacity
        onPress={async () => {
          const uri = await pickImageMutation.mutateAsync();
          setImageUrl(uri);
        }}
      >
        <Avatar.Image
          style={{ backgroundColor: "grey" }}
          size={120}
          source={{ uri: imageUrl }}
        ></Avatar.Image>
      </TouchableOpacity>

      <View className="gap-5 w-full  ">
        <TextInput
          placeholder="Name"
          value={dogName}
          onChangeText={setDogName}
        />

        {/* <DropDown
          mode={"outlined"}
          visible={showDropDown}
          value={gender}
          setValue={setGender}
          list={GENDER}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          placeholder="gender"
        /> */}
        <TextInput placeholder="Age" value={age} onChangeText={setAge} />
        <TextInput
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
