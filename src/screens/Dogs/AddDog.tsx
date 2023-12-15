import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useAddDog, usePickImage, useUploadImage } from "../../api/queries";
import styles from "../Login/signIn.style";
import PickerField from "../../components/PickerField";
import { DogGender } from "../../api/types";

const GENDER = ["male", "female"];
const AGE = [1, 2, 3, 4, 5, 6, 7, 8];

const AddDogView = ({ onClose }) => {
  const [dogName, setDogName] = useState<string>();
  const [age, setAge] = useState<number>(1);
  const [gender, setGender] = useState<DogGender>(DogGender.Male);
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
        console.log("error", dogName, age, gender);
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
          loading={addDogMutation.isLoading || uploadImageMutation.isLoading}
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
