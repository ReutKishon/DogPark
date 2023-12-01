import { ActivityIndicator, Text, View } from "react-native";
import styles from "./mydogs.style";
import { DogsList } from "../../components";
import React, { useState, useEffect, useContext } from "react";
import { useStore } from "../../store";
import List from "../../components/List";
import { getUserDogs } from "../../utils/userDataOperations";
import { useDogs } from "../../api/queries";
import { Button, IconButton } from "react-native-paper";

const DogItem = ({ dog }) => (
  <View className="w-full h-40 flex justify-center p-5 gap-2">
    <Text className="font-bold text-xl">{dog.name}</Text>
    <Text>{dog.gender}</Text>
    <Text>{dog.age} years old</Text>
  </View>
);

const MyDogs = ({ navigation, toggleModal }) => {
  const user = useStore((state) => state.user);
  const { data: dogs } = useDogs();

  if (!dogs) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View className="flex w-full px-4 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="text-2xl font-bold2">My Dogs</Text>
        <IconButton icon={"close"} size={18} mode="contained" onPress={() => toggleModal("myDogs", false)} />
      </View>
      <List data={dogs} renderItem={({ item }) => <DogItem dog={item} />} />
    </View>
  );
};

export default MyDogs;
