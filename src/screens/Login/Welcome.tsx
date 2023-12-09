import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const Welcome = ({ navigation }) => {
  return (
    <View className="flex flex-col justify-center items-center h-full gap-2 w-full overflow-hidden">
      <View className="">
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Register
        </Button>
      </View>
      <View>
        <Button
          mode="outlined"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default Welcome;
