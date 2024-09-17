import React, { useEffect, useMemo, useState } from "react";
import { Text, View, Pressable } from "react-native";

import { List, DogCard } from "../../../components/common";
import {
  useDogs,
  useDogsInPark,
  useAddDogToPark,
  useRemoveDogFromPark,
} from "../../../queries";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { Dog, Park, LocationCoords } from "../../../types";
import { useStore } from "../../../store";
import io from "socket.io-client";
import { useQueryClient } from "react-query";
import { PATH } from "@env";

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
          className={`${selectedAvatars.includes(item.id) ? "opacity-50" : ""}`}
        >
          <Avatar.Image
            size={40}
            source={{
              uri: item.imageName
                ? PATH+"/uploads/" + item.imageName
                : null,
            }}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default function ParkDetails({ navigation, route }) {
  const { park }: { park: Park } = route.params;
  const parkId = park.placeId;

  const setLocation = useStore((state) => state.setLiveLocation);
  const setDogsOnTheMap = useStore((state) => state.setDogsOnTheMap);

  const { data: userDogs } = useDogs();
  const { data: dogsPlayingInPark, isLoading } = useDogsInPark(parkId);

  const addDogToParkMutation = useAddDogToPark();
  const removeDogFromParkMutation = useRemoveDogFromPark();

  const selectedDogAvatars = useMemo(() => {
    return (
      dogsPlayingInPark
        ?.filter((dog) => {
          return userDogs?.some((userDog) => userDog.id === dog.id);
        })
        .map((dog) => dog.id) || []
    );
  }, [dogsPlayingInPark]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const parkLocation: LocationCoords = {
      longitude: park?.locationCoords?.longitude,
      latitude: park?.locationCoords?.latitude,
    };
    setLocation(parkLocation);
    setDogsOnTheMap(dogsPlayingInPark);
    const socket = io("http://localhost:5000");

    socket.on("updateDogInPark", (data) => {
      if (data.parkId === parkId) {
        // Invalidate the query to refetch the dogs in the park
        queryClient.invalidateQueries(["dogsInPark", parkId]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) return <ActivityIndicator />;

  const handleAvatarPress = async (index: number) => {
    const dog: Dog = userDogs[index];
    // if dog in park leave
    if (selectedDogAvatars.includes(dog.id)) {
      await removeDogFromParkMutation.mutateAsync({ dogId: dog.id, parkId });
    }
    // if dog not in park join
    else {
      await addDogToParkMutation.mutateAsync({
        dogId: dog.id,
        parkId,
        previousParkId: dog.current_parkId,
      });
    }
  };

  return (
    <View className="flex w-full px-4 gap-2">
      <Text className="font-bold text-xl">{park.name}</Text>
      <View className="py-1 my-3">
        {userDogs && (
          <SelectableAvatarList
            items={userDogs}
            handleAvatarPress={handleAvatarPress}
            selectedAvatars={selectedDogAvatars}
          />
        )}
      </View>

      <List
        data={dogsPlayingInPark}
        renderItem={({ item }) => (
          <DogCard
            dog={item}
            onpress={() => {
              navigation.navigate("DogProfile", { dog: item });
            }}
          />
        )}
      />
    </View>
  );
}
