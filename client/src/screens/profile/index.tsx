import { Text, View } from "react-native";
import { useStore } from "../../store";
import SettingSection from "../../components/Settings/SettingSection";
import List from "../../components/List";
import { Button, Divider, IconButton, Switch } from "react-native-paper";
import { auth } from "../../../firebase";

export default function Profile({ navigation, onClose }) {
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
                console.log("sign out");
                auth.signOut();
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
