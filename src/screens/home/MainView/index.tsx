import React from "react";
import Parks from "./Parks";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ParkDetails from "./ParkDetails";

const Stack = createStackNavigator();

export default function MainView({popModal}) {
  //   Simple navigation between parks and dogs with no header
  return (
    <Stack.Navigator className="h-full" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Parks" component={Parks} initialParams={{popModal}} />
      <Stack.Screen name="ParkDetails" component={ParkDetails} />
    </Stack.Navigator>
  );
}
