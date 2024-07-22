import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { LifeStage } from "../../types";

export default function DogCard({ dog, onpress }) {
  return (
    <TouchableOpacity onPress={onpress}>
      <View className="h-40 flex-row items-center gap-4">
        <Avatar.Image
          size={50}
          source={
            dog.imageName
              ? { uri: "http://localhost:3000/uploads/" + dog.imageName }
              : null
          }
        />
        <View className="flex-col">
          <Text className="font-bold text-xl">{dog.name}</Text>
          <Text>{dog.gender}</Text>
          <Text>
            {dog.age + " " + (dog.lifeStage == LifeStage.Adult ? "yr" : "mo")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
