import React from "react";
import Parks from "./Parks";
import { createStackNavigator } from "@react-navigation/stack";
import ParkDetails from "./ParkDetails";
import DogProfile from "./DogProfile";
import { Button, IconButton, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Followings from "../../userProfile/Followings";
import { COLORS } from "../../../constants";
import ProfileNavigator from "../../../navigation/ProfileNavigator";

const Stack = createStackNavigator();

export default function MainView({  navigation: parentNavigation  }) {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Button onPress={() => navigation.goBack()}>
            <Text style={{ color: COLORS.secondary }}>Back</Text>
          </Button>
        ),
        headerTitle: "",
      })}
    >
      <Stack.Screen
        name="Parks">
        {(props) => <Parks {...props} parentNavigation={parentNavigation} />}
        </Stack.Screen>

      <Stack.Screen name="ParkDetails" component={ParkDetails} />
      <Stack.Screen name="DogProfile" component={DogProfile} />
    </Stack.Navigator>
  );
}
