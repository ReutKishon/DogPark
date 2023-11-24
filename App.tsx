import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BlurView } from "@react-native-community/blur";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "./tamagui.config";
import {
  Welcome,
  Register,
  SignIn,
  DogDetails,
  Home,
  Parks,
  ParkDetails,
  AddDog,
  MyDogs,
} from "./src/screens";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

import firebase from "firebase/compat";
import { useStore } from "./src/store";
import { getUserLocation } from "./src/api/parkDataOperations";
import { COLORS } from "./src/constants";

function App() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  const routerToIcon = {
    Home: "home",
    MyDogs: "ios-list",
    AddDog: "add-circle",
  };

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const DrawerNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => (
          // <BlurView
          //   style={{
          //     position: "absolute",
          //     bottom: 0,
          //     left: 0,
          //     right: 0,
          //     height: 80,
          //     zIndex: 9999,
          //     paddingBottom: 20,
          //   }}
          //   blurType="light"
          //   blurAmount={100}
          // >
            <BottomTabBar style={{}} {...props} />
          // </BlurView>
        )}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            iconName = routerToIcon[route.name];
            if (!focused) {
              iconName = iconName + "-outline";
            }

            //console.log(size);
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={20} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="MyDogs" component={MyDogs} />
        <Tab.Screen name="AddDog" component={AddDog} />
      </Tab.Navigator>
    );
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer theme={{ colors: { background: "white" } }}>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="DogDetails" component={DogDetails} />
          <Stack.Screen name="Parks" component={Parks} />
          <Stack.Screen name="ParkDetails" component={ParkDetails} />
          <Stack.Screen
            name="DrawerNavigation"
            options={{ headerShown: false, gestureEnabled: false }}
            component={DrawerNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}

export default App;
