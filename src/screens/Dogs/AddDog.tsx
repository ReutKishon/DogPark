import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useAddDog, usePickImage, useUploadImage } from "../../api/queries";
import styles from "../Login/signIn.style";
import PickerField from "../../components/PickerField";
import { Dog, DogGender } from "../../api/types";
import { useStore } from "../../store";

const GENDER = ["male", "female"];
const AGE = [1, 2, 3, 4, 5, 6, 7, 8];

const AddDogView = ({ onClose }) => {
  const user = useStore((state) => state.user);
  const [dogName, setDogName] = useState<string>();
  const [age, setAge] = useState<number>(1);
  const [gender, setGender] = useState<DogGender>(DogGender.Male);
  const [imageUrl, setImageUrl] = useState<string>();
  const [showDropDown, setShowDropDown] = useState(false);
  const pickImageMutation = usePickImage();
  const uploadImageMutation = useUploadImage();
  const addDogMutation = useAddDog();

  const uploadPickedImage = async () => {
    if (!pickImageMutation.data) {
      return "";
    }
    const response = await fetch(pickImageMutation.data);
    const imageBlob = await response.blob();
    console.log("imageBlob", imageBlob);
    const uploadedImageUrl = await uploadImageMutation.mutateAsync(imageBlob);
    console.log("uploadedImageUrl", uploadedImageUrl);
    return uploadedImageUrl;
  };

  const onAddDogSubmit = async () => {
    const uploadedImageUrl = await uploadPickedImage();
    try {
      if (!dogName || !age || !gender) {
        console.log("error", dogName, age, gender);
      } else {
        const dogData: Dog = {
          name: dogName,
          age,
          gender,
          imageUrl: uploadedImageUrl,
          ownerId: user.id,
        };

        await addDogMutation.mutateAsync(dogData);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex items-center px-4 gap-1">
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
