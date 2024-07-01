import React, { useEffect, useState } from "react";
import { View, TextInput, Text, ScrollView, Alert } from "react-native";
import { useStore } from "../../store";
import { useAddDog, useUpdateDog, useUploadImage } from "../../state/queries";
import { Dog, DogGender } from "../../api/types";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import DogAvatar from "./DogAvatar";
import DeleteDogFooter from "./DeleteDogFooter";
import { COLORS } from "../../constants";
import commonStyles from "../../styles/commonStyle";
import OptionButton from "../Buttons/OptionButton";
import AgePicker from "../AgePicker";
import Constants from "expo-constants";
import axios from "axios";
import { uploadImage } from "../../api/api";

const DogForm = ({ onClose, buttonLabel = "Add", initialDogData }) => {
  const user = useStore((state) => state.user);
  const [dogName, setDogName] = useState<string>("");
  const [age, setAge] = useState<number>(1);
  const [gender, setGender] = useState<DogGender>(DogGender.Male);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImageMutation = useUploadImage();
  const addDogMutation = useAddDog();
  const updateDogMutation = useUpdateDog();

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios || Constants.platform.android) {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
    if (initialDogData) {
      setDogName(initialDogData.name);
      setAge(initialDogData.age?.toString());
      setGender(initialDogData.gender);
      setImageUrl("http://localhost:3000/uploads/" + initialDogData.imageName);
    }
  }, []);

  const onSubmitAction = async (dogData: Dog) => {
    if (buttonLabel === "Add") {
      const dogId = await addDogMutation.mutateAsync(dogData);
      if (dogId && dogData.imageName) {
        await uploadImage(imageUrl, dogData.ownerId, dogId);
      }
    } else {
      await updateDogMutation.mutateAsync(dogData);
      if (dogData.imageName && initialDogData.imageUrl !== imageUrl) {
        await uploadImage(imageUrl, dogData.ownerId, dogData.id);
      }
    }
  };

  const onSubmit = async () => {
    try {
      if (!dogName || !age) {
        console.log("error", dogName, age, gender);
        return;
      }

      const dog: Dog = {
        id: initialDogData ? initialDogData.id : undefined, // Only include id for update
        name: dogName,
        age: age,
        gender,
        imageName: imageUrl, // Use the uploaded image file name
        ownerId: user.id,
      };

      await onSubmitAction(dog);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        setImageUrl(response.assets[0].uri);
      }
    }
  };

  return (
    <View className="flex items-center px-4 gap-1">
      <View className="w-full flex-row justify-between items-center">
        <Button onPress={() => onClose()}>Cancel</Button>
        <Button
          icon={buttonLabel == "Add" ? "plus" : "pencil"}
          mode="contained"
          onPress={onSubmit}
          loading={addDogMutation.isLoading || uploadImageMutation.isLoading}
          style={{ backgroundColor: COLORS.primary }}
        >
          <Text className="font-bold">{buttonLabel}</Text>
        </Button>
      </View>
      <ScrollView className="flex-grow">
        <View className="items-center">
          <DogAvatar imageUrl={imageUrl} onCameraPress={openImageLibrary} />

          <View className="flex items-center gap-2 mt-3">
            <TextInput
              style={commonStyles.inputbox}
              placeholder="Name"
              value={dogName}
              onChangeText={setDogName}
            />
            <AgePicker dogAge={age} setDogAge={setAge} />
            <View
              style={{ gap: 10 }}
              className="flex-row justify-between items-center mr-[150] mt-4"
            >
              <OptionButton
                label="Male"
                isActive={gender === DogGender.Male}
                onPress={() => setGender(DogGender.Male)}
              />
              <OptionButton
                label="Female"
                isActive={gender === DogGender.Female}
                onPress={() => setGender(DogGender.Female)}
              />
            </View>
          </View>
        </View>
        {buttonLabel == "Edit" ? (
          <DeleteDogFooter onClose={onClose} dogData={initialDogData} />
        ) : null}
        <View style={{ height: 200 }} />
      </ScrollView>
    </View>
  );
};

export default DogForm;
