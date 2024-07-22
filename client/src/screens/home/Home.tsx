import React, { useState, useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useStore } from "../../store";
import MainView from "./MainView";
import { getUserLocation } from "../../api/location";

import Map from "../../components/home/Map";

const Home = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const setLocation = useStore((state) => state.setLiveLocation);
  
  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getUserLocation();
      console.log("loc " + location.latitude + " " + location.longitude);
      if (location) {
        setLocation(location);
      }
    };

    fetchLocation();
  }, []);

  return (
    <View className="flex items-center justify-start h-full w-full relative">
      <Map />
      <BottomSheetModalProvider>
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
          <MainView navigation={navigation} />
        </BottomSheet>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Home;
