import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./register.style";
import { auth, firestore } from "../../../firebase";
import { Keyboard } from "react-native";
import { Button } from "../../components";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    const userData = { dogs: null, name, password };
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          firestore.collection("users").doc(user.uid).set(userData);
        }
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("The email address is already in use.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>New Account</Text>
     sig
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <Button
        buttonText="Register"
        onPress={handleRegister}
        buttonSize={{ width: 350, height: 50 }}
      />
    </View>
  );
};

export default Register;
