import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./home.style";

const Home = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.signUpButton]}>
        <Text style={[styles.buttonText, styles.signUpText]}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
