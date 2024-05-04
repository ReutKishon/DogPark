import { View, Text } from "react-native";

export default function SettingSection({ title, children }) {
  return (
    <View className="flex w-full gap-2" >
      <Text className="px-2 uppercase font-regular color-re" style={{opacity:0.8}}>{title}</Text>
      <View style={{ borderRadius: 15, backgroundColor: "#474954" }} className="p-4">
        {children}
      </View>
    </View>
  );
}
