import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";

export default function DogCard({ dog, onpress }) {
  const [dogIsAdult, setDogIsAdult] = useState(true);
  const [age, setAge] = useState<number>(null);
  useEffect(() => {
    if (dog.age < 1) {
      setDogIsAdult(false);
      setAge(Math.round(dog.age * 12));
      return;
    }
    setDogIsAdult(true);
    setAge(dog.age);
  });
  return (
    <TouchableOpacity onPress={onpress}>
      <View className="h-40 flex-row items-center gap-4">
        <Avatar.Image
          size={50}
          source={require("../../assets/images/golder-retriever-puppy.jpeg")}
        />
        <View className="flex-col">
          <Text className="font-bold text-xl">{dog.name}</Text>
          <Text>{dog.gender}</Text>
          <Text>{age + " " + (dogIsAdult ? "yr" : "mo")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
