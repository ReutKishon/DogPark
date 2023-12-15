import React, { useEffect, useMemo, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { useDatabaseSnapshot } from "@react-query-firebase/database";

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
import { useStore } from "../../../store";

const DogsIconsList = ({ dogs, handleIconPress, selectedDogs }) => (
  <FlatList
    data={dogs}
    horizontal={true}
    renderItem={({ item, index }) => (
      <Pressable onPress={() => handleIconPress(index)}>
        <View style={{ opacity: selectedDogs.includes(dog.id) ? 1 : 0.5 }}>
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
  const user = useStore((state) => state.user);

  const fetchDogsInPark = async () => {
    const dogs = await GetDogsInPark(park.place_id);
    if (dogs) {
      setDogsInThePark(dogs);
    }
  };

  useEffect(() => {
    console.log("dogs", dogs);
    onSnapshot(doc(firestore, "parks", park.place_id), (doc) => {
      fetchDogsInPark();
    });
  }, []);

  const onDogToggle = (index) => {
    const dogId = dogs[index].id;
    setSelectedDogs((prevSelectedDogs) => {
      if (prevSelectedDogs.includes(dogId)) {
        return prevSelectedDogs.filter((dogKey) => dogKey !== dogId);
      } else {
        return [...prevSelectedDogs, dogId];
      }
    });
  };

  const selectedDogs = useMemo(() => {
    if (!dogsInThePark) {
      return [];
    }

    const dogIds = dogsInThePark.map((dog) => dog.id);
    return dogIds;
  }
  , [dogsInThePark]);

  const isJoined = useMemo(() => {
    if (!dogsInThePark) {
      return false;
    }
    const dogIds = dogsInThePark.map((dog) => dog.id);
    const isJoined = dogIds.some((dogKey) => selectedDogs.includes(dogKey));
    return isJoined;
  }, [dogsInThePark, selectedDogs]);

  const onJoin = async () => {
    if (isJoined) {
      await RemoveDogsFromPark(park.place_id, selectedDogs);
    } else {
      await JoinDogsToPark(park.place_id, user.id, selectedDogs);
    }
  };

  return (
    <View className="flex w-full px-4 gap-2">
      <View className="py-1 my-3">
        <DogsIconsList
          dogs={dogs}
          handleIconPress={onDogToggle}
          selectedDogs={selectedDogs}
        />
      </View>
      <Text className="font-bold text-xl">{park.name}</Text>
      <View>
        <Button onPress={onJoin}>{isJoined ? "Leave" : "Join"}</Button>
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
