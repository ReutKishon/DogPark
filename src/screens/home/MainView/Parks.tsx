import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import List from "../../../components/List";
import { useStore } from "../../../store";
import { getNearestDogParks } from "../../../api/parkDataOperations";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useParks } from "../../../api/queries";
import { Button } from "react-native-paper";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import styles from "../home.style";
// import Ionicons from "react-native-vector-icons/Ionicons";

const ParkItem = ({ item }) => {
  //console.log("park", item);
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
  const {popModal} = route.params

  const { data: parks, isLoading, isIdle } = useParks();

  return (
    <View className="w-full h-full px-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-2xl font-bold2">Parks Around</Text>
        <Button
          mode="outline"
          icon="paw"
          onPress={() => popModal("myDogs")}
        >
          My Dogs
        </Button>
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
