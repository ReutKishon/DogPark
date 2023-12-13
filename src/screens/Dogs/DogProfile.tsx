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

const DogProfile = ({navigation, route}) => {
  const { dog } = route.params;
  const followUser = (userId: string) => {};

  return (
    <View className="flex items-center justify- px-4 gap-1">
      <Button onPress={() => {}}>Cancel</Button>

      <Avatar.Image
        style={{ backgroundColor: "grey" }}
        size={120}
        source={{ uri: dog.owner.imageUri }}
      ></Avatar.Image>

      <View className="flex items-center gap-2"></View>
    </View>
  );
};

export default DogProfile;
