import { Text, View, ActivityIndicator, ScrollView, Pressable, Image } from "react-native";
import styles from "./dogsList.style";
import React, { useState, useEffect } from "react";

const DogCard = ({ dog, handleNavigate }) => {
  return (
    <Pressable
      onPress={handleNavigate}
    >
      <Text>Hello</Text>
    </Pressable>
  );
};


const DogsList = ({ dogs, handleDogPress }) => {
  return (
    <ScrollView>
      <View className="flex gap-10">
        {dogs?.map((dog) => (
          <DogCard
            dog={dog}
            key={dog?.key}
            handleNavigate={() => {
              handleDogPress(dog);
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default DogsList;
