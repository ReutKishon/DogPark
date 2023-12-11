import React from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PickerField({
  title,
  selectedValue,
  items,
  setSelectedValue,
}) {
  return (
    <View className="flex-row justify-between items-center">
      <Text style={{ marginLeft: 13 }}>{title}</Text>
      <View
        style={{
          alignItems: "center",
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 100,
          backgroundColor: "white",
          overflow: "hidden",
          marginTop: 20,
          width: 300,
          height: 60,
          right: 15,
        }}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          numberOfLines={2}
          itemStyle={{
            height: 70,
            width: 350,
            fontSize: 16,
          }}
          mode="dialog"
        >
          {items.map((item, index: number) => (
            <Picker.Item label={item} value={item} key={index} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
