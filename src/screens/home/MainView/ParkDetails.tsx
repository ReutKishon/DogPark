import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";

import List from "../../../components/List";
import { firestore } from "../../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDogs } from "../../../api/queries";
import { Avatar, Button } from "react-native-paper";
import {
  JoinDogsToPark,
  GetDogsInPark,
  RemoveDogsFromPark,
} from "../../../api/api";
import DogCard from "../../../components/DogCard";
import { Dog } from "../../../api/types";

const DogsIconsList = ({ dogs, handleIconPress, selectedDogs }) => (
  <FlatList
    data={dogs}
    horizontal={true}
    renderItem={({ item, index }) => (
      <Pressable onPress={() => handleIconPress(index)}>
        <View style={{ opacity: selectedDogs.includes(index) ? 1 : 0.5 }}>
          <Avatar.Image size={64} source={{ uri: item.imageUrl }} />
        </View>
      </Pressable>
    )}
    ItemSeparatorComponent={() => {
      return (
        <View
          style={{
            width: 12,
          }}
        />
      );
    }}
  ></FlatList>
);

export default function ParkDetails({ navigation, route }) {
  const { park } = route.params;
  const [dogsInThePark, setDogsInThePark] = useState<Array<Dog>>(null);
  const { data: dogs } = useDogs();
  const [selectedDogs, setSelectedDogs] = useState([]);

  const fetchDogsInPark = async () => {
    const dogs = await GetDogsInPark(park.place_id);
    if (dogs != undefined) {
      setDogsInThePark(dogs);
    }
  };

  useEffect(() => {
    onSnapshot(doc(firestore, "parks", park.place_id), (doc) => {
      console.log("data: ", doc.data());
      fetchDogsInPark();
    });
  }, []);

  const handleIconPress = (index) => {
    setSelectedDogs((prevSelectedDogs) => {
      if (prevSelectedDogs.includes(index)) {
        return prevSelectedDogs.filter((dogIndex) => dogIndex !== index);
      } else {
        return [...prevSelectedDogs, index];
      }
    });
  };

  const handleJoinPress = async () => {
    const dogsKeys = selectedDogs.map((dogIndex) => dogs[dogIndex].key);
    if (isInThePark) {
      await RemoveDogsFromPark(park.place_id, dogsKeys);
    } else {
      await JoinDogsToPark(park.place_id, dogsKeys);
    }
    await fetchDogsInPark();
  };

  return (
    <View className="flex w-full px-4 gap-2">
      <View className="py-1 my-3">
        <DogsIconsList
          dogs={dogs}
          handleIconPress={handleIconPress}
          selectedDogs={selectedDogs}
        />
      </View>
      <Text className="font-bold text-xl">{park.name}</Text>
      <View>
        <Button onPress={handleJoinPress}>
          {isInThePark ? "Exit" : "Join"}
        </Button>
      </View>
      <List
        data={dogsInThePark}
        renderItem={({ item, index }) => (
          <DogCard
            dog={item}
            onpress={() => {
              console.log(typeof item);
              navigation.navigate("DogProfile", { dog: item });
            }}
          />
        )}
      />
    </View>
  );
}
