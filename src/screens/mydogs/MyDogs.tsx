import { ActivityIndicator, Text, View } from "react-native";
import styles from "./mydogs.style";
import { DogsList } from "../../components";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useStore } from "../../store";
import List from "../../components/List";
import { getUserDogs } from "../../utils/userDataOperations";
import { useDogs } from "../../api/queries";
import { Button, IconButton } from "react-native-paper";
import AddDogView from "../../components/addDogModal";
import { firestore } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const DogItem = ({ dog }) => (
  <View className="w-full h-40 flex justify-center p-5 gap-2">
    <Text className="font-bold text-xl">{dog.name}</Text>
    <Text>{dog.gender}</Text>
    <Text>{dog.age} years old</Text>
  </View>
);

export const FullModal = React.forwardRef((props, ref) => {
  // variables
  const snapPoints = useMemo(() => ["100%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <BottomSheetModal
      handleStyle={{ display: "none" }}
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      {props.children}
    </BottomSheetModal>
  );
});

function MyDogs({ navigation, toggleModal }) {
  const user = useStore((state) => state.user);
  const { error, data: userDogs } = useDogs();
  const [dogs, setDogs] = useState(userDogs);
  // console.log("userDogs" + JSON.stringify(dogs))

  const modalRef = useRef(null);

  const toggleAddDog = (show: boolean) => {
    if (show) {
      modalRef.current.present();
    } else {
      modalRef.current.dismiss();
    }
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

      <List data={dogs} renderItem={({ item }) => <DogItem dog={item} />} />
      <BottomSheetModalProvider>
        <FullModal ref={modalRef}>
          <AddDogView onClose={() => toggleAddDog(false)} />
        </FullModal>
      </BottomSheetModalProvider>
    </View>
  );
}

export default MyDogs;
