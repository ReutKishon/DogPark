import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
import MainView from "../screens/home/MainView";
import { TemporaryModal } from "../components/TemporaryModal";
import { useEffect, useRef, useState } from "react";
import { MyDogs } from "../screens";
import ProfileStack from "./ProfileNavigator";
import React from "react";

const Stack = createStackNavigator();

type Props = {
  navigation: any;
  toggleModal: (key: string, show: boolean) => void;
  modalViewComponent: React.ReactNode | null;
};

const BottomSheetNavigator = React.forwardRef(
  ({ navigation, toggleModal, modalViewComponent }: Props, ref) => {
    const tempModalComponent = (
      <TemporaryModal maxHeight="60%" ref={ref}>
        {modalViewComponent}
      </TemporaryModal>
    );

    console.log("ref: ", ref);
    return (
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerLeft: null,
          headerTitle: "",
        })}
      >
        <Stack.Screen
          name="MainScreen"
          component={MainView}
          initialParams={{
            navigation: { navigation },
            toggleModal: (key: string, show: boolean) => toggleModal(key, show),
          }}
        ></Stack.Screen>

        <Stack.Screen name="TempScreen">
          {() => tempModalComponent}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
);

export default BottomSheetNavigator;
