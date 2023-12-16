import React from "react";
import { Text, View } from "react-native";
import List from "../../../components/List";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useParks } from "../../../state/queries";
import { Avatar, Button } from "react-native-paper";

const ParkItem = ({ item }) => {
  return (
    <View className="w-full flex justify-center py-10 gap-2">
      <View className="flex flex-row">
        <Text className="font-bold">{item.name}</Text>
        <Text className="font-bold">{item.distance}</Text>
      </View>
      <Text className="font-regular" style={{ fontSize: 12 }}>
        {item.vicinity}
      </Text>
    </View>
  );
};

export default function Parks({ navigation, route }) {
  // get popModal from params navigation
  const { toggleModal } = route.params;

  const { data: parks, isLoading, isIdle } = useParks();

  return (
    <View className="w-full h-full px-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-2xl font-bold2">Parks Around</Text>
        <View className="flex flex-row">
          <Button icon="paw" onPress={() => toggleModal("myDogs", true)}>
            My Dogs
          </Button>
          <TouchableOpacity onPress={() => toggleModal("profile", true)}>
            <Avatar.Image
              size={40}
              source={{ uri: "http://placekitten.com/200/300" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-2">
        <List
          data={parks}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                console.log("item", item);
                navigation.navigate("ParkDetails", { park: item });
              }}
            >
              <ParkItem item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
