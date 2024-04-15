import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Animated,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useAddDog, usePickImage, useUploadImage } from "../../state/queries";
import styles from "../Login/signIn.style";
import { CreationData, Dog, DogGender } from "../../api/types";
import { useStore } from "../../store";
import { COLORS } from "../../constants";

const AddDogView = ({ onClose }) => {
  const user = useStore((state) => state.user);
  const [dogName, setDogName] = useState<string>();
  const [dogIsAdult, setDogIsAdult] = useState<boolean>(true);
  const [age, setAge] = useState<string>();
  const [gender, setGender] = useState<DogGender>(DogGender.Male);
  const [imageUrl, setImageUrl] = useState<string>(
    "https://icons.iconarchive.com/icons/iconarchive/dog-breed/256/Beagle-icon.png"
  );
  const pickImageMutation = usePickImage();
  const uploadImageMutation = useUploadImage();
  const addDogMutation = useAddDog();
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    animate();
  }, []); // Run once when the component mounts

  const animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1200, // Duration of the animation
          useNativeDriver: true, // Enable native driver for better performance
        }),
        Animated.timing(animatedValue, {
          toValue: -1,
          duration: 1200, // Duration of the animation
          useNativeDriver: true, // Enable native driver for better performance
        }),
      ])
    ).start();
  };

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
        const dogData: CreationData<Dog> = {
          name: dogName,
          age: parseInt(age, 10),
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

  const spin = animatedValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-20deg", "0deg", "20deg"], // Rotate from 0 to 360 degrees
  });

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
      <ScrollView className="flex-grow">
        <View className="items-center">
          <TouchableOpacity
            className="px-2 py-4"
            onPress={async () => {
              const uri = await pickImageMutation.mutateAsync();
              setImageUrl(uri);
            }}
          >
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Avatar.Image
                style={{ backgroundColor: COLORS.primary }}
                size={120}
                source={{ uri: imageUrl }}
              ></Avatar.Image>
            </Animated.View>
          </TouchableOpacity>
          <View className="flex items-center gap-2">
            <View className="mb-2">
              <Text className="font-medium mb-2 ml-1">Name</Text>
              <TextInput
                style={[styles.input]}
                value={dogName}
                onChangeText={setDogName}
              />
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row justify-between items-center mr-10 ml-0 mt-4">
                <TouchableOpacity
                  style={[
                    dogIsAdult && { backgroundColor: "purple" },
                    styles.input,
                    { width: 60, height: 32, marginRight: 6 },
                  ]}
                  onPress={() => setDogIsAdult(true)}
                >
                  <Text
                    style={[
                      dogIsAdult && { color: "white" },
                      { textAlign: "center" },
                    ]}
                  >
                    Adult
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    !dogIsAdult && { backgroundColor: "purple" },
                    styles.input,
                    { width: 60, height: 32 },
                  ]}
                  onPress={() => setDogIsAdult(false)}
                >
                  <Text
                    style={[
                      !dogIsAdult && { color: "white" },
                      { textAlign: "center" },
                    ]}
                  >
                    Puppy
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text className="font-medium mb-1 ml-8">
                  {dogIsAdult ? "Age (Yr.)" : "Age (Mo.)"}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={[styles.input, { width: 130, height: 40 }]}
                  value={age}
                  onChangeText={setAge}
                />
              </View>
            </View>
            <View>
              <Text className="font-medium mb-2 ml-1">Sex</Text>
              <View className="flex-row justify-between items-center">
                <TouchableOpacity
                  style={[
                    gender === "Male" && { backgroundColor: "purple" },
                    styles.input,
                    { width: 130, height: 40, marginRight: 40 },
                  ]}
                  onPress={() => setGender(DogGender.Male)}
                >
                  <Text>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    gender === "Female" && { backgroundColor: "purple" },
                    styles.input,
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
        <View style={{ height: 200 }} />
      </ScrollView>
    </View>
  );
};

export default AddDogView;
