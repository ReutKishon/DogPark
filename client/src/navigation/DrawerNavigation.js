import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home, AddDog, MyDogs, DogInParkProfile } from "../screens";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="MyDogs" component={MyDogs} />
      <Drawer.Screen name="AddDog" component={AddDog} />
      <Drawer.Screen name="DogProfile" component={DogInParkProfile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
