import React, { useState, useEffect, useContext, useMemo, useRef, useCallback } from "react";
import { View, Text, ActivityIndicator, FlatList, Pressable } from "react-native";
import styles from "./home.style";
import { DogsList, Button } from "../../components";
import { getUserDogs } from "../../utils/userDataOperations";
import MapView from 'react-native-maps'
import BottomSheet from '@gorhom/bottom-sheet';
import { auth } from "../../../firebase";
import { useStore } from "../../store";



const DogItem = ({ dog }) => (
  <View className="w-full h-24 flex justify-center p-10">
    <Text>{dog.name}</Text>
  </View>
);


const Home = ({ navigation }) => {
  const user = useStore((state) => state.user)

  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['60%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    if (!user) return;
    console.log("Home user", user)
    const fetchUserDogs = async () => {
      const userDogs = await getUserDogs(user.id);
      setLoading(false);

      if (userDogs) {
        console.log("1:" + userDogs);
        setDogs(userDogs);
      }
    };

    fetchUserDogs();
  }, [user]);


  if (loading || !user) {
    return (
      <View className="flex mt-10 items-center justify-center h-full relative w-full">
        <ActivityIndicator className="absolute bottom-0 top-0 z-50" size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex mt-10 items-center justify-start h-full w-full relative">
      <View className="py-8 px-4 w-full ">
        <Text className="text-3xl text-left" style={{ fontFamily: "Poppins_700Bold" }}>Hello {user.name}</Text>
        <Pressable onPress={() => {
          {
            console.log("sign out");
            auth.signOut()
          }
        }
        }><Text>Sign out</Text></Pressable>
      </View>
      <MapView
        className="grow"
        style={{ width: 400 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />



      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View className="flex w-full">
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 1 }} className="bg-gray-200 mx-10"></View>}
          data={dogs}
          renderItem={({ item }) => <DogItem dog={item} />}>
        </FlatList>
      </View>
      </BottomSheet>

    </View>
  );
};

export default Home;
