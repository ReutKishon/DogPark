import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image } from "react-native";
import styles from "./signIn.style";
import { auth } from "../../../firebase";
import { useStore } from "../../store";

import { Button } from "react-native-paper";
import { useSignIn, useUser } from "../../state/queries";
import axios from "axios";
const PATH = "http://localhost:3000";

const SignIn = () => {
  const [email, setEmail] = useState("Reki8611@gmail.com");
  const [password, setPassword] = useState("Rr123456789!");
  const [warning, setWarning] = useState("");
  const signInMutation = useSignIn((errorMessage) => {
    setWarning(errorMessage);
  });

  const handleSignIn = async () => {
    try {
      signInMutation.mutateAsync({ email, password });
    } catch (error) {}
  };

  const imageUrl =
    "https://media1.giphy.com/media/k6sC1yPY1fhbKzXdY4/giphy.gif?cid=ecf05e47gtkcg6y1tqza7sfmcmrcwos2vge6avgzgn2vmf04&ep=v1_stickers_search&rid=giphy.gif&ct=s";

  return (
    <View className="flex flex-col items-center mt-24">
      <View className="flex flex-col gap-8 items-center ">
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <View style={{ height: 15 }}>
          {warning ? <Text style={{ color: "red" }}>{warning}</Text> : null}
        </View>

        <View>
          <Button
            loading={signInMutation.isLoading}
            mode="contained"
            onPress={handleSignIn}
          >
            Sign In
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
