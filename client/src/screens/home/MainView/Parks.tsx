import React from "react";
import { Text, View } from "react-native";
import List from "../../../components/List";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useParks } from "../../../state/queries";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import { Park } from "../../../api/types";
import { COLORS } from "../../../constants";

const ParkItem = ({ item }) => {
  return (
    <View className="w-full flex justify-center py-10 gap-2">
      <View className="flex flex-row">
        <Text className="font-bold">{item.name}</Text>
        <Text className="font-bold">{item.distance}</Text>
      </View>
      <Text className="font-regular" style={{ fontSize: 12 }}>
        {item.address}
      </Text>
    </View>
  );
};

export default function Parks({ navigation, route }) {
  // get popModal from params navigation
  const { setModalScreen } = route.params;

  const { data: parks, isLoading, isIdle } = useParks();
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="w-full h-full px-4">
      <View className="flex flex-row items-center justify-between">
        <Text style={{ color: COLORS.primary }} className="text-2xl font-bold2">
          Parks Around
        </Text>
        <View className="flex flex-row">
          <Button
            textColor={COLORS.secondary}
            icon="paw"
            onPress={() => setModalScreen("MyDogs")}
          >
            My Dogs
          </Button>
          <TouchableOpacity onPress={() => setModalScreen("Profile")}>
            <Avatar.Image
              size={40}
              source={require("../../../assets/images/user_profile.jpg")}
              style={{ backgroundColor: COLORS.secondary }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-2">
        <List
          data={parks}
          renderItem={({ item }: { item: Park }) => (
            <TouchableOpacity
              onPress={() => {
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
