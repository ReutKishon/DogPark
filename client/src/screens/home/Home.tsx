import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Animated, View, useAnimatedValue, Easing } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import MapView, { Marker } from "react-native-maps";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useStore } from "../../store";
import { Avatar, Button } from "react-native-paper";
import MyDogs from "../Dogs/MyDogs";
import MainView from "./MainView";
import { TemporaryModal } from "../../components/TemporaryModal";
import Profile from "../profile";
import { getUserLocation } from "../../api/location";
import { useDogs } from "../../state/queries";
import { confirmPasswordReset } from "firebase/auth/react-native";
import { NavigationContainer } from "@react-navigation/native";
import ProfileStack from "../../navigation/ProfileStack";
const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const temporaryModalSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const [modalViewComponent, setModalViewComponent] =
    useState<React.ReactNode | null>(null);

  const mapRef = useRef(null);
  const setLocation = useStore((state) => state.setLiveLocation);
  const location = useStore((state) => state.liveLocation);
  const latitudeDelta = useAnimatedValue(0.01);
  const longitudeDelta = useAnimatedValue(0.01);
  useEffect(() => {
    (async () => {
      const location = await getUserLocation();
      console.log("loc " + location.latitude + " " + location.longitude);
      if (location) {
        setLocation(location);

        mapRef.current.animateToRegion(
          {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          0
        );
        mapRef.current.animatedCamer;
      }
    })();
  }, []);

  const animateZoomIn = () => {
    Animated.parallel([
      Animated.timing(latitudeDelta, {
        toValue: 0.005, // Desired zoom level
        duration: 3000, // Animation duration
        useNativeDriver: true,
      }),
      Animated.timing(longitudeDelta, {
        toValue: 0.005,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleModal = (key: string, show: boolean) => {
    if (key === "myDogs") {
      setModalViewComponent(
        <MyDogs
          navigation={navigation}
          onClose={() => {
            temporaryModalSheetRef.current.dismiss();
          }}
        />
      );
    } else {
      setModalViewComponent(
        <ProfileStack
          navigation={navigation}
          onClose={() => {
            temporaryModalSheetRef.current.dismiss();
          }}
        />
      );
    }
    return show
      ? temporaryModalSheetRef.current.present()
      : temporaryModalSheetRef.current.dismiss();
  };

  const { data: dogs } = useDogs();
  return (
    <View className="flex items-center justify-start h-full w-full relative">
      <MapView.Animated
        className="w-full h-full"
        ref={mapRef}
        followsUserLocation
        style={{ transform: [{ translateY: -150 }] }}
        initialRegion={{ ...location, latitudeDelta: 0, longitudeDelta: 0 }}
        region={{ ...location, latitudeDelta: 0.002, longitudeDelta: 0.002 }}
        showsUserLocation
        zoomEnabled
        onPress={() => animateZoomIn()}
      >
        {dogs?.map((dog, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <Avatar.Image
              size={40}
              source={{
                uri: dog.imageUrl || "https://picsum.photos/400/400",
              }}
            />
          </Marker>
        ))}
      </MapView.Animated>
      <BottomSheetModalProvider>
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
          <MainView toggleModal={toggleModal} />
          <TemporaryModal maxHeight="60%" ref={temporaryModalSheetRef}>
            {modalViewComponent}
          </TemporaryModal>
        </BottomSheet>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Home;
