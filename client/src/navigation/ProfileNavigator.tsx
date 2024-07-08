import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProfile } from "../screens";
import Followings from "../screens/userProfile/Followings";
import { Button } from "react-native-paper";

const modalStack = createStackNavigator();

const ProfileNavigator = ({ parentNavigation, onClose }) => {
  return (
    <modalStack.Navigator>
      <modalStack.Screen
        name="Profile"
        initialParams={{
          onLogout: () => {
            console.log("Logging out...");
            parentNavigation.navigate("Login");
          },
          handleCloseModal: () => {
            onClose();
          },
        }}
        component={UserProfile}
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
          headerLeft: null,
        }}
      />
      <modalStack.Screen
        name="Followings"
        component={Followings}
        initialParams={{
          handleCloseModal: () => {
            onClose();
          },
        }}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>Back</Button>
          ),
        })}
      />
    </modalStack.Navigator>
  );
};

export default ProfileNavigator;
