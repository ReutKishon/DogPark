import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./signIn.style";
import { auth, firestore } from "../../../firebase";
import { Keyboard } from "react-native";
import { Button } from "react-native-paper";
import { User } from "../../api/types";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use form validation component
  // if (error.code === "auth/email-already-in-use") {
  const handleRegister = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const loggedUser = userCredential.user;
      const user: User = {
        dogs: [],
        name,
        email,
        id: loggedUser.uid,
        imageUrl: "",
      };
      if (loggedUser) {
        //firestore.collection("users").doc(loggedUser.uid).set(user);
        axios.post("http://localhost:3000/user/add", user);
      }
    } catch (error) {}
  };

  return (
    <View className="flex mt-24 px-10">
      <Text>New Account</Text>

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
