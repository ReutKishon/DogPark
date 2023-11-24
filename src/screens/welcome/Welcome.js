import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import styles from "./welcome.style";
import { Button } from "../../components";
import { auth } from "../../../firebase";
import { useStore } from "../../store";
import { getUser } from "../../api";
import { getUserDogs } from "../../utils/userDataOperations";

const Welcome = ({ navigation }) => {
  const setUser = useStore((state) => state.setUser);
  const setDogs = useStore((state) => state.setDogs);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("user is signed in");
        user.id = user.uid;
        user = await getUser(user.id);
        setUser(user);
        await fetchUserDogs(user.id);
        console.log("user found and set in context", user);
        navigation.navigate("DrawerNavigation", { screen: "Home" });
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
