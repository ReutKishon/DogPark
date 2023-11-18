import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./welcome.style";
import { Button } from "../../components";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        buttonText="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
        buttonSize={{ width: 300, height: 50 }}
      />
      <Button
        buttonText="Sign in"
        onPress={() => {
          navigation.navigate("SignIn");
        }}
        buttonSize={{ width: 300, height: 50 }}
      />
    </View>
  );
};

export default Welcome;
