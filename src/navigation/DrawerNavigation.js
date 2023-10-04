import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Home, MyDogs, NewDog } from "../screens";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="MyDogs" component={MyDogs} />
      <Drawer.Screen name="NewDog" component={NewDog} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
