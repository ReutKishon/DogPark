import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Avatar, Icon } from "react-native-paper";
import { useUser } from "../../state/queries";

const RowInfo = ({ info }) => {
  return (
    <View className="flex flex-row items-center justify-between space-x-2">
      <Icon source="paw" size={20}></Icon>
      <Text className="font-bold text-lg">{info}</Text>
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
  const { dog } = route.params;
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
      <View className="items-start gap-10 p-5 top-5">
        <RowInfo info={dog.age + " years old"} />
        <RowInfo info={dog.gender} />
      </View>

      <DogOwnerView ownerId={dog.ownerId} />
    </View>
  );
};

export default DogProfile;
