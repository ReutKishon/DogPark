import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./signIn.style";
import { Keyboard } from "react-native";
import { Button } from "react-native-paper";
import { User } from "../../api/types";
import axios from "axios";
import { useUser } from "../../state/queries";
import { useStore } from "../../store";
const PATH = "http://localhost:3000";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const UserMutation = useUser();
  const setUser = useStore((state) => state.setUser);

  const handleRegister = async () => {
    try {
      const loggedUser = await axios.post(PATH + "/auth/register/", {
        email,
        password,
        fullName,
        phoneNumber,
      });
      const user = await UserMutation.mutateAsync(loggedUser.data.userId);
      console.log("name:" + user.name);
      setUser(user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
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
