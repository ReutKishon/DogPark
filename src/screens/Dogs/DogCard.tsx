import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";

export default function DogCard({dog, onpress }) {
  return (
    <TouchableOpacity onPress={onpress}>
      <View className="h-40 flex-row items-center gap-4">
        <Avatar.Image size={50} source={{ uri: dog.imageUrl }} />
        <View className="flex-col">
          <Text className="font-bold text-xl">{dog.name}</Text>
          <Text>{dog.gender}</Text>
          <Text>{dog.age} years old</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
