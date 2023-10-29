import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./welcome.style";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={[styles.buttonText, styles.signUpText]}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
