import React, { useEffect } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import List from "../../../components/List";
import { useStore } from "../../../store";
import { getNearestDogParks } from "../../../api/parkDataOperations";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  const user = useStore((state) => state.user);
  const parks = useStore((state) => state.parks);
  const setParks = useStore((state) => state.setParks);
  const location = useStore((state) => state.location);

  useEffect(() => {
    if (!location) {
      return;
    }
    const fetchNearestParks = async () => {
      const nearestParks = await getNearestDogParks(location.coords);
      if (nearestParks) {
        setParks(nearestParks);
      }
    };
    fetchNearestParks();
  }, [location]);

  return (
    parks && (
      <View className="w-full h-full">
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
    )
  );
}
