import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProfile } from "../screens";
import Followings from "../screens/userProfile/Followings";
import { Button } from "react-native-paper";

const modalStack = createStackNavigator();

const ProfileNavigator = ({ onClose, parentNavigation }) => {
  return (
    <modalStack.Navigator>
      <modalStack.Screen
        name="Profile"
        initialParams={{ onClose, parentNavigation }}
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
