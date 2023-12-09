import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./signIn.style";
import { auth, firestore } from "../../../firebase";
import { Keyboard } from "react-native";
import { Button } from "react-native-paper";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use form validation component
  // if (error.code === "auth/email-already-in-use") {
  const handleRegister = async () => {
    const userData = { dogs: null, name, password };

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        firestore.collection("users").doc(user.uid).set(userData);
      }
    } catch (error) {}
  };

  return (
    <View className="flex mt-24 px-10">
      <Text >New Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleRegister}>Register</Button>
    </View>
  );
};

export default Register;
