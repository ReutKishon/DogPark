import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import styles from "./welcome.style";
import { Button } from "../../components";

const Welcome = ({ navigation }) => {
  return (
    <View className="flex flex-col justify-center items-center h-full gap-2 w-full overflow-hidden">
      <View className="">
        <Button
          buttonText="Register"
          onPress={() => {
            navigation.navigate("Register");
          }}
          buttonSize={{ width: 300, height: 50 }}
        />
      </View>

      <View>
        <Button
          buttonText="Sign in"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          buttonSize={{ width: 300, height: 50 }}
        />
      </View>
    </View>

  );
};

export default Welcome;
