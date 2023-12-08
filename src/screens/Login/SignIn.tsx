import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image } from "react-native";
import styles from "./signIn.style";
import { auth } from "../../../firebase";
import { useStore } from "../../store";
import { getUser, getUserDogs } from "../../api/api";
import { Button } from "react-native-paper";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("elad.636@gmail.com");
  const [password, setPassword] = useState("Elad9352221");
  const [errorMessage, setErrorMessage] = useState("");
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          console.log("user is signed in");
          user.id = user.uid;
          user = await getUser(user.id);
          setUser(user);

          await fetchUserDogs(user.id);

          console.log("user found and set in context", user);
          navigation.navigate("DrawerNavigation", { screen: "Home" });
        }
      } catch {
        console.error("Error in onAuthStateChanged:", error);
      }
    });
  }, []);

  const fetchUserDogs = async (userId) => {
    console.log("hi: ");
    try {
      const dogs = await getUserDogs(userId);
      console.log("dogs: ", dogs);
      if (dogs) {
        setDogs(dogs);
      }
    } catch (error) {
      console.error("Error fetching user dogs:", error);
    }
  };

  const handleSignIn = async () => {
    const { user } = await auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Please enter a valid email address");
        } else if (error.code === "auth/invalid-login-credentials") {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
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
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <View>
          <Button mode="contained" onPress={handleSignIn}>
            Sign In
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
