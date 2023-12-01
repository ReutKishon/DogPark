import { Text, View } from "react-native";
import { useStore } from "../../store";
import SettingSection from "../../components/Settings/SettingSection";
import List from "../../components/List";
import { Divider, Switch, ToggleButton } from "react-native-paper";

export default function Profile() {
  const user = useStore((state) => state.user);
  return (
    <View className="w-full mt-20">
      <View className="flex gap-4 ">
        <View className="px-4 w-full">
          <Text className="text-3xl font-bold2">
            Hey <Text style={{ color: "#861657" }}>{user.name}</Text>!
          </Text>
        </View>

        <View className="flex items-center px-4">
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
        </View>
      </View>
    </View>
  );
}
