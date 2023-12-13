import React from "react";
import Parks from "./Parks";
import { createStackNavigator } from "@react-navigation/stack";
import ParkDetails from "./ParkDetails";
import DogProfile from "../../Dogs/DogProfile";

const Stack = createStackNavigator();

export default function MainView({ toggleModal }) {
  return (
    <Stack.Navigator className="h-full" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Parks"
        component={Parks}
        initialParams={{
          toggleModal: (key: string, show: boolean) => toggleModal(key, show),
        }}
      />
      <Stack.Screen name="ParkDetails" component={ParkDetails} />
      <Stack.Screen name="DogProfile" component={DogProfile} />
    </Stack.Navigator>
  );
}
