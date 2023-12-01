import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PaperProvider } from "react-native-paper";

import {
  Welcome,
  Register,
  SignIn,
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
import { QueryClient, QueryClientProvider } from "react-query";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Profile from "./src/screens/profile";
import Home from "./src/screens/home/Home";
const queryClient = new QueryClient();

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
    Home: "map",
    Profile: "cog",
    AddDog: "add-circle",
  };

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const DrawerNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={({ state, descriptors, navigation }) => (
          <View className="w-full h-12 flex justify-center items-center">
            <View
              className="flex flex-row justify-evenly w-1/2 mb-16 mx-12 h-16"
              style={{ borderRadius: 60, backgroundColor: "#93E1D8" }}
            >
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                const onLongPress = () => {
                  navigation.emit({
                    type: "tabLongPress",
                    target: route.key,
                  });
                };

                let iconName = routerToIcon[route.name];
                if (!isFocused) {
                  iconName = iconName + "-outline";
                }

                return (
                  <View
                    className="flex justify-center items-center"
                    key={index}
                  >
                    <TouchableOpacity
                      onPress={onPress}
                      onLongPress={onLongPress}
                    >
                      <Ionicons
                        name={iconName}
                        size={30}
                        color={isFocused ? "black" : COLORS.secondary}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          // <BottomTabBar style={{}} {...props} />
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
        <Tab.Screen name="Profile" component={Profile} />
        {/* <Tab.Screen name="AddDog" component={AddDog} /> */}
      </Tab.Navigator>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer theme={{ colors: { background: "white" } }}>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen
              name="DrawerNavigation"
              options={{ headerShown: false, gestureEnabled: false }}
              component={DrawerNavigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
