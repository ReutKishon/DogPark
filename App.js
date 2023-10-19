import React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigation from "./src/navigation/DrawerNavigation";
import {
  Welcome,
  Register,
  SignIn,
  MyDogs,
  DogDetails,
  Trip,
  Home,
  Parks,
  ParkDetails,
} from "./src/screens";

import { useFonts } from "expo-font";
import firebaseApp from "./firebase";

const Stack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    DMBold: require("./src/assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./src/assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./src/assets/fonts/DMSans-Regular.ttf"),
    UbuntuCondensed: require("./src/assets/fonts/UbuntuCondensed-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="MyDogs" component={MyDogs} />
        <Stack.Screen name="DogDetails" component={DogDetails} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Parks" component={Parks} />
        <Stack.Screen name="ParkDetails" component={ParkDetails} />
        <Stack.Screen name="Trip" component={Trip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
