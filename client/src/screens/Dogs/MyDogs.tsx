import { ActivityIndicator, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import List from "../../components/List";
import { Avatar, Button, IconButton } from "react-native-paper";
import AddDogView from "./AddDog";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useDogs } from "../../state/queries";
import { TemporaryModal } from "../../components/TemporaryModal";
import DogCard from "./DogCard";

function MyDogs({ navigation, onClose }) {
  const { data: dogs } = useDogs();
  const modalRef = useRef(null);
  const [pressedDog, setPressedDog] = useState<null>();
  const toggleAddDog = (show: boolean) => {
    if (show) {
      modalRef.current.present();
    } else {
      modalRef.current.dismiss();
    }
  };

  const onPressDogCard = (item: any) => {
    setPressedDog(item);
    toggleAddDog(true);
  };

  const onPressAddDog = () => {
    setPressedDog(null);
    toggleAddDog(true);
  };

  if (!dogs) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View className="flex w-full px-4 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="text-2xl font-bold2">My Dogs</Text>

        <View className="flex-row items-center">
          <Button icon={"plus"} onPress={() => onPressAddDog()}>
            Add dog
          </Button>
          <IconButton
            icon={"close"}
            size={18}
            mode="contained"
            onPress={() => onClose()}
          />
        </View>
      </View>

      <View style={{ height: "90%" }}>
        <List
          data={dogs}
          renderItem={({ item }) => (
            <DogCard dog={item} onpress={() => onPressDogCard(item)} />
          )}
        />
        <View style={{ height: 100 }} />
      </View>
      <BottomSheetModalProvider>
        <TemporaryModal ref={modalRef}>
          <AddDogView
            onClose={() => toggleAddDog(false)}
            dogData={pressedDog}
          />
        </TemporaryModal>
      </BottomSheetModalProvider>
    </View>
  );
}

export default MyDogs;
