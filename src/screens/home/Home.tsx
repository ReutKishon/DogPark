import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  Platform,
  Button,
} from "react-native";
import MapView from "react-native-maps";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { auth } from "../../../firebase";
import { useStore } from "../../store";
import {
  getNearestDogParks,
  getUserLocation,
} from "../../api/parkDataOperations";
import { useSharedValue } from "react-native-reanimated";
import List from "../../components/List";
import MainView from "./MainView";
import { MenuView } from "@react-native-menu/menu";


const HeaderItems = (props) => {
  return (
    <View className="w-full">
      {/*       
      <MenuView
        title="Menu Title"
        onPressAction={({ nativeEvent }) => {
          console.warn(JSON.stringify(nativeEvent));
        }}
        actions={[
          {
            id: "add",
            titleColor: "#2367A2",
            image: Platform.select({
              ios: "plus",
              android: "ic_menu_add",
            }),
            imageColor: "#2367A2",
            subactions: [
              {
                id: "nested1",
                title: "Nested action",
                titleColor: "rgba(250,180,100,0.5)",
                subtitle: "State is mixed",
                image: Platform.select({
                  ios: "heart.fill",
                  android: "ic_menu_today",
                }),
                imageColor: "rgba(100,200,250,0.3)",
                state: "mixed",
              },
              {
                id: "nestedDestructive",
                title: "Destructive Action",
                attributes: {
                  destructive: true,
                },
                image: Platform.select({
                  ios: "trash",
                  android: "ic_menu_delete",
                }),
              },
            ],
          },
          {
            id: "share",
            title: "Share Action",
            titleColor: "#46F289",
            subtitle: "Share action on SNS",
            image: Platform.select({
              ios: "square.and.arrow.up",
              android: "ic_menu_share",
            }),
            imageColor: "#46F289",
            state: "on",
          },
          {
            id: "destructive",
            title: "Destructive Action",
            attributes: {
              destructive: true,
            },
            image: Platform.select({
              ios: "trash",
              android: "ic_menu_delete",
            }),
          },
        ]}
        shouldOpenOnLongPress={false}
      >
        <Button title="elad" />
      </MenuView> */}
    </View>
  );
};

const Home = ({ navigation }) => {
  const user = useStore((state) => state.user);
  const bottomSheetRef = useRef(null);
  const bottomSheetModalPark = useRef(null);
  const snapPoints = useMemo(() => ["30%", "60%"], []);

  const mapRef = useRef(null);
  const setLocation = useStore((state) => state.setLocation);
  const location = useStore((state) => state.location);

  useEffect(() => {
    (async () => {
      const location = await getUserLocation();
      if (location) {
        //console.log("Location:", location);
        setLocation(location);
        mapRef.current.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          0
        );
        mapRef.current.animatedCamer;
      }
    })();
  }, []);

  useEffect(() => {
    if (bottomSheetModalPark.current) {
      bottomSheetModalPark.current.present();
    }
  }, [bottomSheetModalPark]);

  return (
    <View className="flex items-center justify-start h-full w-full relative">
     
      <MapView.Animated
        className="w-full h-full"
        ref={mapRef}
        followsUserLocation
        style={{ transform: [{ translateY: -150 }] }}
        initialRegion={location?.coords}
        region={location?.coords}
        showsUserLocation
        zoomEnabled
      />

      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <MainView />
      </BottomSheet>
    </View>
  );
};

export default Home;
