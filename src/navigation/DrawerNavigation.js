import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home, AddDog, MyDogs } from "../screens";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="MyDogs" component={MyDogs} />
      <Drawer.Screen name="AddDog" component={AddDog} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
