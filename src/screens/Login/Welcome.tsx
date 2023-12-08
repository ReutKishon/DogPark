import React, { useEffect } from "react";
import { View } from "react-native";
import { auth } from "../../../firebase";
import { useStore } from "../../store";
import { getUser, getUserDogs } from "../../api/api";
import { Button } from "react-native-paper";

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
          mode="contained"
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Register
        </Button>
      </View>
      <View>
        <Button
          mode="outlined"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default Welcome;
