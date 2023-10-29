import React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserIdProvider } from "./src/contexts/UserIdContext";
import { UserDataProvider } from "./src/contexts/UserDataContext";
import {
  Welcome,
  Register,
  SignIn,
  DogDetails,
  Home,
  Parks,
  ParkDetails,
  AddDog,
  MyDogs,
} from "./src/screens";
//import DrawerNavigation from "./src/navigation/DrawerNavigation"
import { useFonts } from "expo-font";
import { COLORS } from "./src/constants";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

  const DrawerNavigation = () => {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="MyDogs" component={MyDogs} />
        <Drawer.Screen name="AddDog" component={AddDog} />
      </Drawer.Navigator>
    );
  };

  return (
    <UserIdProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Parks">
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="DogDetails" component={DogDetails} />
          <Stack.Screen name="Parks" component={Parks} />
          <Stack.Screen name="ParkDetails" component={ParkDetails} />
          <Stack.Screen
            name="DrawerNavigation"
            options={{ headerShown: false }}
            component={DrawerNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserIdProvider>
  );
}

export default App;
