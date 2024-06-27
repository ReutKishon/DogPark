import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
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

const DogForm = ({ onClose, buttonLabel = "Add", initialDogData }) => {
  const user = useStore((state) => state.user);
  const [dogName, setDogName] = useState<string>("");
  const [age, setAge] = useState<number>(1);
  const [gender, setGender] = useState<DogGender>(DogGender.Male);
  const [nameBorderColor, setNameBorderColor] = useState<string>();
  const [ageBorderColor, setAgeBorderColor] = useState<string>();
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImageMutation = useUploadImage();
  const addDogMutation = useAddDog();
  const updateDogMutation = useUpdateDog();

  const handleCameraPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (initialDogData) {
      setDogName(initialDogData.name);
      setAge(initialDogData.age?.toString());
      setGender(initialDogData.gender);
      //setImageUrl(dogData.imageUrl);
    }
  }, []); // Run once when the component mounts

  const onSubmitAction = async (dogData: Dog) => {
    if (buttonLabel == "Add") {
      await addDogMutation.mutateAsync(dogData);
    } else {
      await updateDogMutation.mutateAsync(dogData);
    }
  };

  const onSubmit = async () => {
    try {
      if (!dogName || !age) {
        console.log("error", dogName, age, gender);
        setNameBorderColor(dogName?.trim() ? "gray" : "red");
        return;
      }
      const dog: Dog = {
        id: initialDogData ? initialDogData.id : undefined, // Only include id for update
        name: dogName,
        age: age,
        gender,
        imageUrl: imageUrl,
        ownerId: user.id,
      };

      onSubmitAction(dog);
      onClose();
    } catch (error) {
      console.log(error);
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
          <DogAvatar imageUrl={imageUrl} onCameraPress={handleCameraPress} />

          <View className="flex items-center gap-2 mt-3">
            <TextInput
              style={commonStyles.inputbox}
              placeholder="Name"
              value={dogName}
              secureTextEntry={true}
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
