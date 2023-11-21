import { ActivityIndicator, Text, View } from "react-native";
import styles from "./mydogs.style";
import { DogsList } from "../../components";
import React, { useState, useEffect, useContext } from "react";
import { getUserDogs } from "../../utils/userDataOperations";
import { useStore } from "../../store";
import List from "../../components/List";

const DogItem = ({ item }) => (
  <View className="w-full h-24 flex justify-center p-10">
    <Text>{item.name}</Text>
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
    <View className="flex w-full flex-col items-center mt-24">
      <List data={dogs} renderItem={({ item }) => <DogItem item={item} />} />
    </View>
  );
};

export default MyDogs;
