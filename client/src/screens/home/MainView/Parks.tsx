import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { List } from "../../../components/common";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useParks } from "../../../queries";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import { Park } from "../../../types";
import { COLORS } from "../../../constants";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ProfileNavigator from "../../../navigation/ProfileNavigator";
import MyDogs from "../../dogs/MyDogs";

const ParkItem = ({ item }) => {
  return (
    <View className="w-full flex justify-center py-10 gap-2">
      <View className="flex flex-row">
        <Text className="font-bold">{item.name}</Text>
        <Text className="font-bold">{item.distance}</Text>
      </View>
      <Text className="font-regular" style={{ fontSize: 12 }}>
        {item.address}
      </Text>
    </View>
  );
};

export default function Parks({navigation, parentNavigation }) {
  const [modalScreen, setModalScreen] = useState(null);
  const temporaryModalSheetRef = useRef(null);
  const modalSnapPoints = useMemo(() => ["30%", "200%"], []);

  const { data: parks, isLoading, isIdle } = useParks();

  const handleOpenModal = useCallback((screen: string) => {
    setModalScreen(screen);
    temporaryModalSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    temporaryModalSheetRef.current?.dismiss();
    setModalScreen(null);
  }, []);

 
  const renderContent = useCallback(() => {
    switch (modalScreen) {
      case "MyDogs":
        return <MyDogs onClose={closeModal} />;
      case "Profile":
        return (
          <ProfileNavigator onClose={closeModal} parentNavigation={parentNavigation} />
        );
      default:
        return null;
    }
  }, [modalScreen,closeModal]);

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
      <View className="px-2">
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
