import React, { useEffect } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import List from "../../../components/List";
import { useStore } from "../../../store";
import { getNearestDogParks } from "../../../api/parkDataOperations";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useParks } from "../../../api/queries";
import { Button } from "react-native-paper";

const ParkItem = ({ item }) => {
  //console.log("park", item);
  return (
    <View className="w-full flex justify-center p-10 gap-2">
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

export default function Parks({ navigation }) {
  const {data: parks, isLoading, isIdle} = useParks()  

  return  <View className="w-full h-full">
            <Button mode="text">Elad</Button>

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
}
