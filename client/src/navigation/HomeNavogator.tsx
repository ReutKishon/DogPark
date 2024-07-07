import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileNavigator from './ProfileNavigator';
import Home from '../screens/home/Home';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
