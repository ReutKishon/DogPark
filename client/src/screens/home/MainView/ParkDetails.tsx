import React, { useEffect, useMemo, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { useDatabaseSnapshot } from "@react-query-firebase/database";

import List from "../../../components/List";
import { firestore } from "../../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDogs } from "../../../state/queries";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import { getDogsInPark, updateDogCurrentPark } from "../../../api/api";
import DogCard from "../../Dogs/DogCard";
import { Dog, Park, LocationCoords } from "../../../api/types";
import { useStore } from "../../../store";
import { LocationObject } from "expo-location";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

const SelectableAvatarList = ({
  items,
  handleAvatarPress,
  selectedAvatars,
}) => {
  return (
    <View className="flex flex-row gap-1">
      {items.map((item: Dog, index: number) => (
        <Pressable
          key={index}
          onPress={() => handleAvatarPress(index)}
          className={`${selectedAvatars.includes(index) ? "opacity-50" : ""}`}
        >
          <Avatar.Image
            size={40}
            source={{
              uri: item.imageUrl,
            }}
          />
        </Pressable>
      ))}
    </View>
  );
};
export default function ParkDetails({ navigation, route }) {
  const { park }: { park: Park } = route.params;
  const setLocation = useStore((state) => state.setLocation);

  const { data: dogs } = useDogs();
  const [dogsPlayingInPark, setDogsPlayingInPark] = useState<Dog[]>([]);

  useEffect(() => {
    const parkLocation: LocationCoords = {
      longitude: park?.locationCoords?.longitude,
      latitude: park?.locationCoords?.latitude,
    };
    setLocation(parkLocation);
  }, []);

  const selectedDogAvatars = useMemo(() => {
    if (!dogs) {
      return [];
    }
    const dogsInParkIds = dogsPlayingInPark.map((dog) => dog.id);
    const selectedDogs = dogs
      .map((dog:Dog, index:number) => {
        if (dogsInParkIds.includes(dog.id)) {
          return index;
        }
      })
      .filter((item) => item !== undefined);
    return selectedDogs;
  }, [dogsPlayingInPark, dogs]);

  if (!dogs) {
    return <ActivityIndicator />;
  }

  const handleAvatarPress = async (index: number) => {
    console.log("index", index);
    const dog: Dog = dogs[index];
    console.log("dog", dog);
    // if dog in park leave
    if (selectedDogAvatars.includes(index)) {
      await updateDogCurrentPark(dog.id, null);
    }
    // if dog not in park join
    else {
      await updateDogCurrentPark(dog.id, park.placeId);
    }
  };

  return (
    <View className="flex w-full px-4 gap-2">
      <Text className="font-bold text-xl">{park.name}</Text>
      <View className="py-1 my-3">
        <SelectableAvatarList
          items={dogs}
          handleAvatarPress={handleAvatarPress}
          selectedAvatars={selectedDogAvatars}
        />
      </View>

      <List
        data={dogsPlayingInPark}
        renderItem={({ item }) => (
          <DogCard
            dog={item}
            onpress={() => {
              console.log("item: " + typeof item);
              navigation.navigate("DogProfile", { dog: item });
            }}
          />
        )}
      />
    </View>
  );
}
