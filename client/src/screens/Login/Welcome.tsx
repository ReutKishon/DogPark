import React from "react";
import { Dimensions, ImageBackground, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../../constants";

const Welcome = ({ navigation }) => {
  const imageUrl =
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGJ4NXA5MXR3aXM2aGtkZzY1bGZpNmR1ZHBudnRqd2NvaTJvZTBjbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mynT1vekMKm6TCrXq4/giphy.gif";
  // "https://media1.giphy.com/media/k6sC1yPY1fhbKzXdY4/giphy.gif?cid=ecf05e47gtkcg6y1tqza7sfmcmrcwos2vge6avgzgn2vmf04&ep=v1_stickers_search&rid=giphy.gif&ct=s";

  return (
    <View className="flex items-center">
      <Image
        source={{ uri: imageUrl }}
        className="h-[200px] w-[200px] mt-[90px]"
      />
      <View className="flex flex-col gap-8 items-center mt-1">
        <Text className="font-bold text-3xl">Hello</Text>
        <Text className="text-s text-center">
          Explore FurryTrails, where furry friends find fun{"\n"} and friendship
          on every path!
        </Text>
        <View className="flex flex-col gap-3 mt-30">
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            style={{ backgroundColor:COLORS.primary}}
            className="w-72"
          >
            <Text className="text-white font-bold text-sm">Sign In</Text>
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              navigation.navigate("Register");
            }}
            className="w-72"
            style={{ borderColor: COLORS.primary }}
          >
            <Text className="font-bold text-sm" style={{color:COLORS.primary}}>Register</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
