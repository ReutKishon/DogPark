import { View, Text } from "react-native";
import List from "../../components/List";
import DogCard from "./DogCard";
import { Button, IconButton } from "react-native-paper";

export default function Followings({ navigation, dogs, onClose }) {
  console.log("Followings: ",dogs);
  return (
    <View className="flex w-full px-4 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="text-2xl font-bold2">Followings</Text>
        <IconButton
          icon={"close"}
          size={18}
          mode="contained"
          onPress={() => onClose()}
        />
      </View>
      <List
        data={dogs}
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
