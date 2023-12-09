import { ActivityIndicator, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import List from "../../../components/List";
import { Avatar, Button, IconButton } from "react-native-paper";
import AddDogView from "../AddDog";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useDogs } from "../../../api/queries";
import { FullModal } from "../../../components/FullModal";

const DogItem = ({ dog }) => (
  <View className="w-full h-40 flex justify-center">
    <View className="flex-row gap-4">
      <Avatar.Image size={50} source={{ uri: dog.imageUrl }} />
      <View className="flex-col">
        <Text className="font-bold text-xl">{dog.name}</Text>
        <Text>{dog.gender}</Text>
        <Text>{dog.age} years old</Text>
      </View>
    </View>
  </View>
);

function MyDogs({ navigation, toggleModal }) {
  const { data: dogs } = useDogs();
  const modalRef = useRef(null);

  const toggleAddDog = (show: boolean) => {
    if (show) {
      modalRef.current.present();
    } else {
      modalRef.current.dismiss();
    }
  };

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
            onPress={() => toggleModal("myDogs", false)}
          />
        </View>
      </View>

      <View style={{ height: "90%" }}>
        <List data={dogs} renderItem={({ item }) => <DogItem dog={item} />} />
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
