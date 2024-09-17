import { Text, View } from "react-native";
import { useStore } from "../../store";
import SettingSection from "../../components/Settings/SettingSection";
import { Button, Divider, IconButton, Switch } from "react-native-paper";

export default function UserProfile({ navigation, route }) {
  const { onLogout, handleCloseModal } = route.params;

  const user = useStore((state) => state.user);
  console.log(user);
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
            onPress={() => handleCloseModal()}
          />
        </View>

        <View className="flex flex-col items-start gap-2">
          <Button
            onPress={() => {
              {
                navigation.navigate("Followings");
              }
            }}
          >
            <Text className="font-bold text-l">Followings</Text>
          </Button>

          <Button
            onPress={() => {
              {
                console.log("sign out");
                onLogout();
              }
            }}
          >
            <Text className="font-bold text-l">Sign out</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

{
  /* <SettingSection title="Account">
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
          </SettingSection> */
}
