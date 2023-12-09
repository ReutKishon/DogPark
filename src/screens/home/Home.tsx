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
import { useSharedValue } from "react-native-reanimated";
import List from "../../components/List";
import { MenuView } from "@react-native-menu/menu";
import { Button } from "react-native-paper";
import MyDogs from "../Dogs/MyDogs";
import Profile from "../Profile";
import AddDogView from "../Dogs/AddDog";
import { getUserLocation } from "../../api/api";
import MainView from "./MainView";
import { FullModal } from "../../components/FullModal";

export const HomeTemportatyModal = React.forwardRef((props, ref) => {
  // variables
  const snapPoints = useMemo(() => ["60%"], []);

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
  const bottomSheetRef = useRef(null);
  const temporaryModalSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const [modalViewComponent, setModalViewComponent] = useState();

  const mapRef = useRef(null);
  const setLocation = useStore((state) => state.setLocation);
  const location = useStore((state) => state.location);

  useEffect(() => {
    (async () => {
      const location = await getUserLocation();
      if (location) {
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

  const modalKeyToComponent = {
    myDogs: <MyDogs navigation={navigation} />,
    profile: <Profile navigation={navigation} />,
  };

  // toggleModal is not really necessary, it can just be placed direcly in the Parks component

  const toggleModal = (key: string, show: boolean) => {
    if (modalKeyToComponent[key]) {
      setModalViewComponent(
        React.cloneElement(modalKeyToComponent[key], {
          onClose: () => temporaryModalSheetRef.current.dismiss(),
        })
      );
    }

    return show
      ? temporaryModalSheetRef.current.present()
      : temporaryModalSheetRef.current.dismiss();
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
          <FullModal maxHeight="60%" ref={temporaryModalSheetRef}>
            {modalViewComponent}
          </FullModal>
        </BottomSheet>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Home;
