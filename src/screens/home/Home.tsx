import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import MapView from "react-native-maps";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { auth } from "../../../firebase";
import { useStore } from "../../store";
import { getUserLocation } from "../../api/parkDataOperations";
import { useSharedValue } from "react-native-reanimated";
import List from "../../components/List";
import MainView from "./MainView";
import { MenuView } from "@react-native-menu/menu";
import { Button } from "react-native-paper";
import MyDogs from "../mydogs/MyDogs";
import Profile from "../profile";

export const HomeTemportatyModal = React.forwardRef((props, ref) => {
  // variables
  const snapPoints = useMemo(() => [ "60%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      {props.children}
    </BottomSheetModal>
  );
});

const Home = ({ navigation }) => {
  const user = useStore((state) => state.user);
  const bottomSheetRef = useRef(null);
  const myDogsSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const [modalViewComponent, setModalViewComponent] = useState(<MyDogs />);

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

  const toggleModal = (key: string, show: boolean) => {
    if (key == "myDogs") {
      setModalViewComponent(
        <MyDogs toggleModal={toggleModal} navigation={navigation} />
      );
    }
    if (key == "profile") {
      console.log("key", key);
      setModalViewComponent(<Profile navigation={navigation} toggleModal={toggleModal} />);
    }

    if (show) {
      myDogsSheetRef.current.present();
    } else {
      myDogsSheetRef.current.dismiss();
    }
  };

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
      <BottomSheetModalProvider>
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
          <MainView toggleModal={toggleModal} />
        </BottomSheet>
        <HomeTemportatyModal ref={myDogsSheetRef}>{modalViewComponent}</HomeTemportatyModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Home;
