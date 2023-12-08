import { ActivityIndicator, Text, View } from "react-native";
import styles from "./mydogs.style";
import { DogsList } from "../../components";
import React, { useState, useEffect, useContext } from "react";
import { useStore } from "../../store";
import List from "../../components/List";
import { getUserDogs } from "../../utils/userDataOperations";
import { useDogs } from "../../api/queries";
import { Button, IconButton } from "react-native-paper";
import AddDogModal from "../../components/addDogModal";
import { firestore } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
const DogItem = ({ dog }) => (
  <View className="w-full h-40 flex justify-center p-5 gap-2">
    <Text className="font-bold text-xl">{dog.name}</Text>
    <Text>{dog.gender}</Text>
    <Text>{dog.age} years old</Text>
  </View>
);

function MyDogs({ navigation, toggleModal }) {
  console.log("Mydofs");
  const user = useStore((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const { error, data: userDogs } = useDogs();
  const [dogs, setDogs] = useState(userDogs);
  console.log("userDogs" + JSON.stringify(dogs))
  const toggleAddDogModal = () => {
    setModalVisible(!modalVisible);
  };

  const fetchUserDogs = async () => {
    try {
      const { error, data: userDogs } = useDogs();

      if (!error && userDogs) {
        setDogs(userDogs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onSnapshot(doc(firestore, "users", user.id), (doc) => {
      //fetchUserDogs();
      //console.log("userDogs" + JSON.stringify(dogs));
      setDogs(userDogs);
    });
  }, [userDogs]);

  if (!dogs) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View className="flex w-full px-4 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="text-2xl font-bold2">My Dogs</Text>
        <IconButton
          icon={"close"}
          size={18}
          mode="contained"
          onPress={() => toggleModal("myDogs", false)}
        />
      </View>
      <IconButton
        icon={"plus"}
        size={18}
        mode="contained"
        onPress={toggleAddDogModal}
      />
      <AddDogModal
        modalVisible={modalVisible}
        toggleAddDogModal={toggleAddDogModal}
      />
      <List data={dogs} renderItem={({ item }) => <DogItem dog={item} />} />
    </View>
  );
}

export default MyDogs;
