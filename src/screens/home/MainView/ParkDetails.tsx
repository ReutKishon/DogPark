import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";

import List from "../../../components/List";
import { firestore } from "../../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDogs } from "../../../api/queries";
import { Avatar, Button } from "react-native-paper";
import {
  AddDogsToPark,
  GetDogsInPark,
  RemoveDogsFromPark,
} from "../../../api/api";
const DogItem = ({ dog }) => (
  <View className="w-full h-40 flex justify-center p-5 gap-2">
    <Text className="font-bold text-xl">{dog.name}</Text>
    <Text>{dog.gender}</Text>
    <Text>{dog.age} years old</Text>
  </View>
);

const DogsIconsList = ({ dogs, handleIconPress, selectedDogs }) => (
  <FlatList
    data={dogs}
    horizontal={true}
    renderItem={({ item, index }) => (
      <Pressable onPress={() => handleIconPress(index)}>
        <View style={{ opacity: selectedDogs.includes(index) ? 1 : 0.5 }}>
          <Avatar.Image
            size={64}
            source={{ uri: "http://placekitten.com/200/300" }}
          />
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
  //console.log("park:" + park.place_id);
  const [dogsInThePark, setDogsInThePark] = useState([]);
  const { data: dogs } = useDogs();
  const [selectedDogs, setSelectedDogs] = useState([]);
  const [isInThePark, setIsInThePark] = useState(false);

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
    setIsInThePark(!isInThePark);
    if (isInThePark) {
      await RemoveDogsFromPark(park.place_id, dogsKeys);
    } else {
      await AddDogsToPark(park.place_id, dogsKeys);
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
        <Button
          onPress={handleJoinPress}
        >{isInThePark ? "Exit" : "Join"}</Button>
      </View>
      <List
        data={dogsInThePark}
        renderItem={({ item, index }) => <DogItem dog={item} />}
      />
    </View>
  );
}
