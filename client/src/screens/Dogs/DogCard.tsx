import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { LifeStage } from "../../api/types";

export default function DogCard({ dog, onpress }) {
  console.log("imageUrl1: " + dog.imageUrl);
  return (
    <TouchableOpacity onPress={onpress}>
      <View className="h-40 flex-row items-center gap-4">
        <Avatar.Image size={50} source={{ uri: dog.imageUrl }} />
        <View className="flex-col">
          <Text className="font-bold text-xl">{dog.name}</Text>
          <Text>{dog.gender}</Text>
          <Text>
            {dog.age +
              " " +
              (dog.lifeStage == LifeStage.Adult ? "years old" : "months")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
