import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./signIn.style";
import { Keyboard } from "react-native";
import { Button } from "react-native-paper";
import { User } from "../../api/types";
import axios from "axios";
const PATH = "http://localhost:3000";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // use form validation component
  // if (error.code === "auth/email-already-in-use") {
  const handleRegister = async () => {
    try {
      console.log("Register");
      const loggedUser = await axios.post(PATH + "/auth/register/", {
        email,
        password,
        fullName,
        phoneNumber,
      });
      console.log("loggedUserData: " + loggedUser.data);
      const user: User = {
        dogs: [],
        name: fullName,
        email,
        id: loggedUser.data,
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
        placeholder="name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />

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
