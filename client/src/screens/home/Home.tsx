import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  View,
  useAnimatedValue,
  Easing,
  Dimensions,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useStore } from "../../store";
import { Avatar } from "react-native-paper";
import MyDogs from "../dogs/MyDogs";
import MainView from "./MainView";
import { getUserLocation } from "../../api/location";
import { useDogs } from "../../queries";

const Home = ({ navigation }) => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["30%", "60%"], []);
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
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          0
        );
        mapRef.current.animatedCamera;
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
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
          >
            <Avatar.Image
              size={40}
              source={{
                uri: dog.imageName || "https://picsum.photos/400/400",
              }}
            />
          </Marker>
        ))}
      </MapView.Animated>
      <BottomSheetModalProvider>
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
          <MainView navigation={navigation} />
        </BottomSheet>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Home;
