import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import {  Button } from "react-native-paper";
import {
  useAddDog,
  useUpdateDog,
  usePickImage,
  useUploadImage,
} from "../../state/queries";
import * as ImagePicker from "expo-image-picker";
import styles from "../Login/signIn.style";
import { CreationData, Dog, DogGender, LifeStage } from "../../api/types";
import { useStore } from "../../store";
import DeleteDogFooter from "../../components/myDogProfile/DeleteDogFooter";
import DogAvatar from "../../components/myDogProfile/DogAvatar";

const MyDogProfile = ({
  onClose,
  dogData,
  buttonName,
}: {
  onClose: () => void;
  dogData: Dog;
  buttonName: string;
}) => {
  const user = useStore((state) => state.user);
  const [dogName, setDogName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [lifeStage, setLifeStage] = useState<LifeStage>(LifeStage.Adult);
  const [gender, setGender] = useState<DogGender>(DogGender.Male);
  const [nameBorderColor, setNameBorderColor] = useState<string>();
  const [ageBorderColor, setAgeBorderColor] = useState<string>();
  const [imageUrl, setImageUrl] = useState(null);

  const pickImageMutation = usePickImage();
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
    if (dogData) {
      setDogName(dogData.name);
      setAge(dogData.age?.toString());
      setLifeStage(dogData.lifeStage);
      setGender(dogData.gender);
      //setImageUrl(dogData.imageUrl);
    }
  }, []); // Run once when the component mounts

  const onSubmit = async () => {
    try {
      if (!dogName || !age) {
        console.log("error", dogName, age, gender);
        setNameBorderColor(dogName?.trim() ? "gray" : "red");
        setAgeBorderColor(age.trim() ? "gray" : "red");
        return;
      }
      const dog: Dog = {
        id: buttonName === "Add" ? undefined : dogData.id, // Only include id for update
        name: dogName,
        age: parseInt(age, 10),
        gender,
        lifeStage,
        imageUrl: imageUrl, // Uncomment if needed
        ownerId: user.id,
      };

      await (buttonName === "Add"
        ? addDogMutation
        : updateDogMutation
      ).mutateAsync(dog);
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
          icon={buttonName == "Add" ? "plus" : "pencil"}
          mode="contained"
          onPress={onSubmit}
          loading={addDogMutation.isLoading || uploadImageMutation.isLoading}
        >
          {buttonName}
        </Button>
      </View>
      <ScrollView className="flex-grow">
        <View className="items-center">
          <DogAvatar imageUrl={imageUrl} onCameraPress={handleCameraPress} />

          <View className="flex items-center gap-2">
            <View className="mb-2">
              <Text className="font-medium mb-2 ml-1">Name</Text>
              <TextInput
                style={[styles.input, { borderColor: nameBorderColor }]}
                value={dogName}
                onChangeText={setDogName}
              />
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row justify-between items-center mr-10 ml-0 mt-4">
                <TouchableOpacity
                  style={[
                    styles.input,
                    lifeStage === LifeStage.Adult && {
                      backgroundColor: "#E6E6FA",
                      borderColor: "purple",
                    },
                    { width: 60, height: 32, marginRight: 6 },
                  ]}
                  onPress={() => setLifeStage(LifeStage.Adult)}
                >
                  <Text>Adult</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.input,
                    ,
                    lifeStage === LifeStage.Puppy && {
                      backgroundColor: "#E6E6FA",
                      borderColor: "purple",
                    },
                    { width: 60, height: 32 },
                  ]}
                  onPress={() => setLifeStage(LifeStage.Puppy)}
                >
                  <Text>Puppy</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text className="font-medium mb-1 ml-8">
                  {lifeStage == "Adult" ? "Age (Yr.)" : "Age (Mo.)"}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={[
                    styles.input,
                    { width: 130, height: 40, borderColor: ageBorderColor },
                  ]}
                  value={age}
                  onChangeText={setAge}
                />
              </View>
            </View>
            <View>
              <Text className="font-medium mb-2 ml-1">Gender</Text>
              <View className="flex-row justify-between items-center">
                <TouchableOpacity
                  style={[
                    styles.input,
                    ,
                    gender === DogGender.Male && {
                      backgroundColor: "#E6E6FA",
                      borderColor: "purple",
                    },
                    { width: 130, height: 40, marginRight: 40 },
                  ]}
                  onPress={() => setGender(DogGender.Male)}
                >
                  <Text>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.input,
                    ,
                    gender === DogGender.Female && {
                      backgroundColor: "#E6E6FA",
                      borderColor: "purple",
                    },
                    { width: 130, height: 40 },
                  ]}
                  onPress={() => setGender(DogGender.Female)}
                >
                  <Text>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {buttonName == "Edit" ? (
          <DeleteDogFooter {...{ dogData, onClose }} />
        ) : null}
        <View style={{ height: 200 }} />
      </ScrollView>
    </View>
  );
};

export default MyDogProfile;
