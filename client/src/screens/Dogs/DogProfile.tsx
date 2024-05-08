import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Avatar, Icon } from "react-native-paper";
import { useUser } from "../../state/queries";
import { Dog, LifeStage } from "../../api/types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVenus, faCakeCandles } from "@fortawesome/free-solid-svg-icons";

const DogDetailCard = ({ text, iconName }) => {
  return (
    <View className="w-100 flex-row items-center bg-purple-100 rounded-full py-2 px-4 my-4">
      <FontAwesomeIcon icon={iconName} size={18} color="black" />
      <Text className="ml-2 text-lg font-bold">{text}</Text>
    </View>
  );
};

function DogOwnerView({ ownerId }) {
  const [owner, setOwner] = useState(null);
  const useUserMutation = useUser();

  const fetchOwner = async () => {
    const owner = await useUserMutation.mutateAsync(ownerId);
    setOwner(owner);
  };

  useEffect(() => {
    fetchOwner();
  }, []);

  return (
    owner && (
      <View className="border-double border-2 border-indigo-600 rounded-lg">
        <View className="flex flex-row items-center space-x-12 p-2">
          <Avatar.Image
            className="bg-gray left-3"
            size={65}
            source={{ uri: owner.imageUrl }}
          />
          <Text>{owner.name}</Text>
        </View>
      </View>
    )
  );
}

const DogProfile = ({ route }) => {
  const dog: Dog = route.params.dog;
  const followUser = (userId: string) => {};

  return (
    <View className="px-2 gap-1">
      <View className="items-center top-5">
        <Avatar.Image
          style={{ backgroundColor: "grey" }}
          size={120}
          source={{ uri: dog.imageUrl }}
        ></Avatar.Image>
      </View>
      <View className="flex flex-row justify-between px-20">
        <DogDetailCard text={dog.gender} iconName={faVenus} />
        <DogDetailCard
          text={
            dog.age +
            " " +
            (dog.lifeStage == LifeStage.Adult ? "years old" : "months")
          }
          iconName={faCakeCandles}
        />
      </View>
    </View>
  );
};

export default DogProfile;
