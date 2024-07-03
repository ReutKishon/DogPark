import { Text, View } from "react-native";
import { useStore } from "../../store";
import SettingSection from "../../components/Settings/SettingSection";
import { Button, Divider, IconButton, Switch } from "react-native-paper";
import { useFollowings } from "../../queries";
import { useRef } from "react";
import { TemporaryModal } from "../../components/common";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Followings from "./Followings";

export default function UserProfile({ onClose, navigation }) {
  const { data: userFollowings } = useFollowings();
  const modalFollowingsRef = useRef(null);

  const toggleModal = (
    modalRef: React.MutableRefObject<any>,
    show: boolean
  ) => {
    if (show) {
      modalRef.current.present();
    } else {
      modalRef.current.dismiss();
    }
  };

  const user = useStore((state) => state.user);
  return (
    <View className="w-full">
      <View className="flex gap-4 ">
        <View className="px-4  flex flex-row justify-between items-center">
          <Text className="text-3xl font-bold2">
            Hey <Text style={{ color: "#861657" }}>{user.name}</Text>!
          </Text>
          <IconButton
            icon={"close"}
            size={18}
            mode="contained"
            onPress={() => onClose()}
          />
        </View>

        <View className="flex items-center px-4 gap-4">
          <SettingSection title="Account">
            <View className="flex gap-4">
              <View className="flex flex-row items-center justify-between">
                <Text className="font-bold2  text-white">Name</Text>
                <Switch value={true} />
              </View>
              <Divider />
              <View className="flex flex-row items-center justify-between">
                <Text className="font-bold2  text-white">Name</Text>
                <Switch value={true} />
              </View>
            </View>
          </SettingSection>
          <Button
            onPress={() => {
              {
                toggleModal(modalFollowingsRef, true);
              }
            }}
          >
            Followings
          </Button>

          <Button
            onPress={() => {
              {
                console.log("sign out");
                //auth.signOut();
                navigation.navigate("Login");
              }
            }}
          >
            Sign out
          </Button>
        </View>
      </View>
    </View>
  );
}
