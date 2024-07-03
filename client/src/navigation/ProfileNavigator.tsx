// ProfileStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProfile } from "../screens";
import Followings from "../screens/userProfile/Followings";
import { Button } from "react-native-paper";
// Import other profile-related screens here

const profileStack = createStackNavigator();

const ProfileNavigator = ({ navigation, onClose }) => {
  return (
    <profileStack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Button onPress={() => navigation.goBack()}>Back</Button>
        ),
        headerTitle: "",
      })}
    >
      <profileStack.Screen
        name="Profile"
        initialParams={{ onClose: onClose, navigation: navigation }}
        component={UserProfile}
      />
      <profileStack.Screen name="Followings" component={Followings} />
    </profileStack.Navigator>
  );
};

export default ProfileNavigator;
