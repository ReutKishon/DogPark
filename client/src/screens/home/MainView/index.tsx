import React from "react";
import Parks from "./Parks";
import { createStackNavigator } from "@react-navigation/stack";
import ParkDetails from "./ParkDetails";
import DogProfile from "../../Dogs/DogInParkProfile";
import { Button, IconButton, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function MainView({ toggleModal, navigation }) {
  return (
    <Stack.Navigator
      className="h-full"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Button onPress={() => navigation.goBack()}>Back</Button>
        ),
        headerTitle: "",
      })}
    >
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
