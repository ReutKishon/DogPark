import React from "react";
import {
  Alert,
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, IconButton } from "react-native-paper";

export default function DogAvatar({ imageUrl, onCameraPress }) {
  console.log("imageUrl: " + imageUrl);
  return (
    <View className="relative">
      <Avatar.Image
        size={150}
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("../../assets/images/defaultDogIcon.jpeg")
        }
        className="rounded-full"
      />
      <IconButton
        icon="camera"
        size={20}
        onPress={onCameraPress}
        className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-[#1cd896]"
      />
    </View>
  );
}
