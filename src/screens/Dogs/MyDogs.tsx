import { ActivityIndicator, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import List from "../../components/List";
import { Avatar, Button, IconButton } from "react-native-paper";
import AddDogView from "./AddDog";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useDogs } from "../../api/queries";
import { FullModal } from "../../components/FullModal";
import DogCard from "../../components/DogCard";

function MyDogs({ navigation, onClose }) {
  const { data: dogs } = useDogs();
  const modalRef = useRef(null);

  const toggleAddDog = (show: boolean) => {
    if (show) {
      modalRef.current.present();
    } else {
      modalRef.current.dismiss();
    }
  };

  const editDogDetails = () => {};

  if (!dogs) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View className="flex w-full px-4 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="text-2xl font-bold2">My Dogs</Text>

        <View className="flex-row items-center">
          <Button icon={"plus"} onPress={() => toggleAddDog(true)}>
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
          renderItem={({ item }) => <DogCard dog={item} onpress={() => {}} />}
        />
      </View>
      <BottomSheetModalProvider>
        <FullModal ref={modalRef}>
          <AddDogView onClose={() => toggleAddDog(false)} />
        </FullModal>
      </BottomSheetModalProvider>
    </View>
  );
}

export default MyDogs;
