import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useAddDog, usePickImage, useUploadImage } from "../../state/queries";
import styles from "../Login/signIn.style";
import PickerField from "../../components/PickerField";
import { CreationData, Dog, DogGender } from "../../api/types";
import { useStore } from "../../store";

const GENDER = ["male", "female"];
const AGE = [1, 2, 3, 4, 5, 6, 7, 8];

const AddDogView = ({ onClose }) => {
  const user = useStore((state) => state.user);
  const [dogName, setDogName] = useState<string>();
  const [age, setAge] = useState<string>();
  const [gender, setGender] = useState<DogGender>(DogGender.Male);
  const [imageUrl, setImageUrl] = useState<string>();
  const [showDropDown, setShowDropDown] = useState(false);
  const pickImageMutation = usePickImage();
  const uploadImageMutation = useUploadImage();
  const addDogMutation = useAddDog();
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [scrollViewHeight, setScrollViewHeight] = React.useState(0);

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

  const handleContentSizeChange = (contentWidth:number, contentHeight:number) => {
    if (scrollViewRef.current){
    if (scrollViewHeight >= contentHeight) {
      scrollViewRef.current.setNativeProps({ scrollEnabled: false });
    } else {
      scrollViewRef.current.setNativeProps({ scrollEnabled: true });
    }
  }
  };

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setScrollViewHeight(height);
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
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
        className="flex-grow"
      >
        <View className="items-center">
          <TouchableOpacity
            className="px-2 py-4"
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
            <View className="mb-2">
              <Text className="font-medium mb-2 ml-1">Name</Text>
              <TextInput
                style={[styles.input]}
                value={dogName}
                onChangeText={setDogName}
              />
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <View className="mr-10">
                <Text className="font-medium mb-2 ml-1">Age (Yr.)</Text>
                <TextInput
                  keyboardType="numeric"
                  style={[styles.input, { width: 130, height: 40 }]}
                  value={age}
                  onChangeText={setAge}
                />
              </View>
              <View>
                <Text className="font-medium mb-2 ml-1">Age (Mo.)</Text>
                <TextInput
                  keyboardType="numeric"
                  style={[styles.input, { width: 130, height: 40 }]}
                  value={age}
                  onChangeText={setAge}
                />
              </View>
            </View>
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
      </ScrollView>
    </View>
  );
};

export default AddDogView;
