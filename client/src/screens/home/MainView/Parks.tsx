import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, Text, View } from "react-native";
import { List } from "../../../components/common";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDogsInPark, useParks } from "../../../queries";
import { ActivityIndicator, Avatar, Button, Icon } from "react-native-paper";
import { Park } from "../../../types";
import { COLORS } from "../../../constants";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ProfileNavigator from "../../../navigation/ProfileNavigator";
import MyDogs from "../../dogs/MyDogs";
import { io } from "socket.io-client";

const ParkItem: React.FC<{ item: Park }> = React.memo(({ item }) => {
  const { data: dogsInPark } = useDogsInPark(item.placeId);
  useEffect(() => {}, [dogsInPark]);

  return (
    <View className="w-full flex justify-center py-10 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="font-bold">{item.name}</Text>
        <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
          {item.distance} meters
        </Text>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="font-regular" style={{ fontSize: 12 }}>
          {item.address}
        </Text>
        <View className="flex flex-row">
          <Icon size={18} source={require("../../../assets/icons/dog.png")} />
          <Text
            style={{ color: COLORS.primary, marginLeft: 5, fontWeight: "bold" }}
          >
            {dogsInPark?.length}
          </Text>
        </View>
      </View>
    </View>
  );
});

export default function Parks({ navigation, parentNavigation }) {
  const [modalScreen, setModalScreen] = useState(null);
  const temporaryModalSheetRef = useRef(null);
  const modalSnapPoints = useMemo(() => ["30%", "200%"], []);
  const { data: parks, isLoading, isIdle } = useParks();

  const handleOpenModal = useCallback((screen: string) => {
    setModalScreen(screen);
    temporaryModalSheetRef.current?.present();
  }, []);

  const handleCloseModal = useCallback(() => {
    temporaryModalSheetRef.current?.dismiss();
    setModalScreen(null);
  }, []);

  const renderContent = useCallback(() => {
    switch (modalScreen) {
      case "MyDogs":
        return <MyDogs onClose={handleCloseModal} />;
      case "Profile":
        return (
          <ProfileNavigator
            parentNavigation={parentNavigation}
            onClose={handleCloseModal}
          />
        ); //parentNavigation={parentNavigation}
      default:
        return null;
    }
  }, [modalScreen]);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View className="w-full h-full px-4">
      <View className="flex flex-row items-center justify-between">
        <Text style={{ color: COLORS.primary }} className="text-2xl font-bold2">
          Parks Around
        </Text>
        <View className="flex flex-row">
          <Button
            textColor={COLORS.secondary}
            icon="paw"
            onPress={() => handleOpenModal("MyDogs")}
          >
            My Dogs
          </Button>
          <TouchableOpacity onPress={() => handleOpenModal("Profile")}>
            <Avatar.Image
              size={40}
              source={require("../../../assets/images/user_profile.jpg")}
              style={{ backgroundColor: COLORS.secondary }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: "90%" }} className="px-2">
        <List
          data={parks}
          renderItem={({ item }: { item: Park }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ParkDetails", { park: item });
              }}
            >
              <ParkItem item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={temporaryModalSheetRef}
          snapPoints={modalSnapPoints}
          enablePanDownToClose={true}
          index={modalScreen ? 1 : -1}
        >
          {renderContent()}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
}
