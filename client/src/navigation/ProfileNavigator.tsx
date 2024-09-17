import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProfile } from "../screens";
import Followings from "../screens/userProfile/Followings";
import { Button } from "react-native-paper";

const profileStack = createStackNavigator();

const ProfileNavigator = ({ parentNavigation, onClose }) => {
  return (
    <profileStack.Navigator>
      <profileStack.Screen
        name="Profile"
        initialParams={{
          onLogout: () => {
            console.log("Logging out...");
            parentNavigation.navigate("Login",{ screen: "Welcome" });
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
      <profileStack.Screen
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
    </profileStack.Navigator>
  );
};

export default ProfileNavigator;
