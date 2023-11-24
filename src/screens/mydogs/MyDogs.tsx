import { ActivityIndicator, Text, View } from "react-native";
import styles from "./mydogs.style";
import { DogsList } from "../../components";
import React, { useState, useEffect, useContext } from "react";
import { useStore } from "../../store";
import List from "../../components/List";
import { getUserDogs } from "../../utils/userDataOperations";

const DogItem = ({ dog }) => (
  <View className="w-full h-40 flex justify-center p-5 gap-2">
    <Text className="font-bold text-xl">{dog.name}</Text>
    <Text>{dog.gender}</Text>
    <Text>{dog.age} years old</Text>
  </View>
);

const MyDogs = ({ navigation }) => {
  const user = useStore((state) => state.user);
  const dogs = useStore((state) => state.dogs);
  const setDogs = useStore((state) => state.setDogs);

  useEffect(() => {
    const fetchUserDogs = async () => {
      const dogs = await getUserDogs(user.id);
      if (dogs) {
        console.log("dogs", dogs);
        setDogs(dogs);
      }
    };

    fetchUserDogs();
  }, [user]);

  const handleDogPress = (dog) => {
    navigation.navigate("DogDetails", { dog });
  };
  if (!dogs) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View className="flex w-full px-4 gap-2 pt-10">
      <List data={dogs} renderItem={({ item }) => <DogItem dog={item} />} />
    </View>
  );
};

export default MyDogs;
