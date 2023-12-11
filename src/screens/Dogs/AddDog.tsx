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
import { Picker } from "@react-native-picker/picker";
import styles from "../Login/signIn.style";
import PickerField from "../../components/PickerField";

const GENDER = ["male", "female"];
const AGE = [1, 2, 3, 4, 5, 6, 7, 8];

const AddDogView = ({ onClose }) => {
  const [dogName, setDogName] = useState<string>();
  const [age, setAge] = useState<number>(1);
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
    <View className="flex items-center justify- px-4 gap-1">
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

      <View className="flex items-center gap-2">
        <View>
          <TextInput
            placeholder="Name"
            style={[styles.input]}
            value={dogName}
            onChangeText={setDogName}
          />
        </View>
        <View>
          <PickerField
            title="Age"
            selectedValue={age}
            setSelectedValue={setAge}
            items={AGE}
          />
        </View>
        <View>
          <PickerField
            title="Gender"
            selectedValue={gender}
            setSelectedValue={setGender}
            items={GENDER}
          />
        </View>
      </View>
    </View>
  );
};

export default AddDogView;
