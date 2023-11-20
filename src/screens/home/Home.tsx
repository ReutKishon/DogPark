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
} from "react-native";
import MapView from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { auth } from "../../../firebase";
import { useStore } from "../../store";
import {
  getNearestDogParks,
  getUserLocation,
} from "../../api/parkDataOperations";
import { useSharedValue } from "react-native-reanimated";

const DogItem = ({ dog }) => (
  <View className="w-full h-24 flex justify-center p-10">
    <Text>{dog.name}</Text>
  </View>
);

const ParkItem = ({ park }) => (
  <View className="w-full h-24 flex justify-center p-10">
    <Text>{park.name}</Text>
  </View>
);

const Home = ({ navigation }) => {
  const user = useStore((state) => state.user);
  const parks = useStore((state) => state.parks);
  const setNearParks = useStore((state) => state.setNearParks);
  const [mapHeight, setMapHeight] = useState("40%");
  // animated shared value
  const animatedPosition = useSharedValue(0);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const handleSheetChanges = useCallback(
    (fromIndex: number, toIndex: number) => {
      // if (toIndex === 0) {
      //   setMapHeight("100%");
      // } else {
      //   setMapHeight("40%");
      // }
    },
    []
  );

  const mapRef = useRef(null);
  const setLocation = useStore((state) => state.setLocation);
  const location = useStore((state) => state.location);

  useEffect(() => {
    console.log("animatedPosition", animatedPosition.value);
  }, [animatedPosition]);

  useEffect(() => {
    (async () => {
      const location = await getUserLocation();
      if (location) {
        console.log("Location:", location);
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
    if (!location) {
      return;
    }
    const fetchNearestParks = async () => {
      const nearestParks = await getNearestDogParks(location.coords);
      if (nearestParks) {
        console.log("nearest parks:" + nearestParks);
        setNearParks(nearestParks);
      }
    };
    fetchNearestParks();
  }, [location]);

  return (
    <View className="flex items-center justify-start h-full w-full relative">
      <View
        className="py-4  px-4 w-full absolute top-0 bg-white"
        style={{ zIndex: 9999 }}
      >
        <View className="mt-10 w-full py-4">
          <Text
            className="text-3xl text-left"
            style={{ fontFamily: "Poppins_700Bold" }}
          >
            Hello {user.name}
          </Text>
        </View>

        <Pressable
          onPress={() => {
            {
              console.log("sign out");
              auth.signOut();
              navigation.navigate("SignIn");
            }
          }}
        >
          <Text>Sign out</Text>
        </Pressable>
      </View>
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

      <BottomSheet
        animatedPosition={animatedPosition}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onAnimate={handleSheetChanges}
      >
        {!parks && (
          <View className="flex mt-10 items-center justify-center h-full relative w-full">
            <ActivityIndicator
              className="absolute bottom-0 top-0 z-50"
              size="large"
              color="#0000ff"
            />
          </View>
        )}
        {parks && (
          <View className="w-full h-full">
            <FlatList
              ItemSeparatorComponent={() => (
                <View
                  style={{ height: 1 }}
                  className="bg-gray-200 mx-10"
                ></View>
              )}
              data={parks}
              renderItem={({ item }) => <ParkItem park={item} />}
            ></FlatList>
          </View>
        )}
      </BottomSheet>
    </View>
  );
};

export default Home;
