import React, { useEffect, useMemo, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { useDatabaseSnapshot } from "@react-query-firebase/database";

import List from "../../../components/List";
import { firestore } from "../../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDogs } from "../../../state/queries";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import {
  AddDogsToPark,
  getDogsInPark,
  removeDogsFromPark,
} from "../../../api/api";
import DogCard from "../../Dogs/DogCard";
import { Dog } from "../../../api/types";
import { useStore } from "../../../store";

const SelectableAvatarList = ({
  items,
  handleAvatarPress,
  selectedAvatars,
}) => {
  return (
    <View className="flex flex-row gap-1">
      {items.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => handleAvatarPress(index)}
          className={`${selectedAvatars.includes(index) ? "opacity-50" : ""}`}
        >
          <Avatar.Image
            size={40}
            source={{
              uri: item.imageUrl || "https://picsum.photos/400/400",
            }}
          />
        </Pressable>
      ))}
    </View>
  );
};
export default function ParkDetails({ navigation, route }) {
  const { park } = route.params;
  const { data: dogs } = useDogs();
  const [dogsCurrentlyInPark, setDogsCurrentlyInPark] = useState<Dog[]>([]);

  useEffect(() => {
    onSnapshot(doc(firestore, "parks", park.place_id), async (doc) => {
      const dogs = await getDogsInPark(park.place_id);
      if (dogs) {
        setDogsCurrentlyInPark(dogs);
      }
    });
  }, []);

  const selectedDogAvatars = useMemo(() => {
    console.log("dogsCurrentlyInPark", dogsCurrentlyInPark);
    console.log("dogs", dogs);
    if (!dogsCurrentlyInPark || !dogs) {
      return [];
    }
    const dogsInParkIds = dogsCurrentlyInPark.map((dog) => dog.id);
    const selectedDogs = dogs
      .map((dog, index) => {
        if (dogsInParkIds.includes(dog.id)) {
          return index;
        }
      })
      .filter((item) => item !== undefined);
    return selectedDogs;
  }, [dogsCurrentlyInPark, dogs]);

  if (!dogs) {
    return <ActivityIndicator />;
  }

  return (
    <View className="flex w-full px-4 gap-2">
      <Text className="font-bold text-xl">{park.name}</Text>
      <View className="py-1 my-3">
        <SelectableAvatarList
          items={dogs}
          handleAvatarPress={async (index) => {
            const dog = dogs[index];
            // if dog in park leave
            if (selectedDogAvatars.includes(index)) {
              await removeDogsFromPark(park.place_id, [dog.id]);
            }
            // if dog not in park join
            else {
              await AddDogsToPark(park.place_id, [dog.id]);
            }
          }}
          selectedAvatars={selectedDogAvatars}
        />
      </View>

      <List
        data={dogsCurrentlyInPark}
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
