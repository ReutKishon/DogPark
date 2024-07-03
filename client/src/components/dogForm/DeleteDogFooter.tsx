import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useDeleteDog } from "../../queries";
import DeleteDogModal from "./DeleteDogModal";

export default function DeleteDogFooter({ dogData, onClose }) {
  const [modalVisible, setModalVisible] = useState(false);
  const deleteDogMutation = useDeleteDog();

  const deleteDogProfile = async () => {
    deleteDogMutation.mutateAsync(dogData.id);
    onClose();
  };

  return (
    <View className="px-2 py-4">
      <TouchableOpacity
        className="flex justify-center items-center pt-8"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-center text-red-500">
          Delete {dogData.name}'s profile
        </Text>
      </TouchableOpacity>

      <DeleteDogModal
        dogName={dogData.name}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteDogProfile={deleteDogProfile}
      />
    </View>
  );
}
