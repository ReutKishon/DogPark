import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserIdProvider } from "./src/contexts/UserIdContext";
import Ionicons from 'react-native-vector-icons/Ionicons';

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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
} from '@expo-google-fonts/poppins';

import { create } from 'zustand'
import firebase from "firebase/compat";

export const useStore = create((set) => ({
  user: null,
  bears: 0,
  setUser: (user) => set({ user }),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

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
    Home: 'home',
    MyDogs: 'ios-list',
    AddDog: 'add-circle',
  };

  const DrawerNavigation = () => {
    return (
      <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          iconName = routerToIcon[route.name];
          if (focused) {
            iconName = iconName + '-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="MyDogs" component={MyDogs} />
        <Tab.Screen name="AddDog" component={AddDog} />
      </Tab.Navigator>
    );
  };


  



  return (
    <UserIdProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="DogDetails" component={DogDetails} />
          <Stack.Screen name="Parks" component={Parks} />
          <Stack.Screen name="ParkDetails" component={ParkDetails} />
          <Stack.Screen
            name="DrawerNavigation"
            options={{ headerShown: false }}
            component={DrawerNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserIdProvider>
  );
}

export default App;
