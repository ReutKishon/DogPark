import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import styles from "./welcome.style";
import { Button } from "../../components";
import { auth } from "../../../firebase";
import { useStore } from "../../store";
import { getUser } from "../../api";

const Welcome = ({ navigation }) => {
  const setUser = useStore((state) => state.setUser)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("user is signed in");
        user.id = user.uid;
        user = await getUser(user.id);
        setUser(user)
        console.log("user found and set in context", user);
        navigation.navigate("DrawerNavigation", { screen: "Home" });
      }
    });
  }, []);

  return (
    <View className="flex flex-col justify-center items-center h-full gap-2 w-full overflow-hidden">
      <View className="">
        <Button
          buttonText="Register"
          onPress={() => {
            navigation.navigate("Register");
          }}
          buttonSize={{ width: 300, height: 50 }}
        />
      </View>

      <View>
        <Button
          buttonText="Sign in"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          buttonSize={{ width: 300, height: 50 }}
        />
      </View>
    </View>

  );
};

export default Welcome;
