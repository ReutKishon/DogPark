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
    <View className="flex justify-between items-start">
      <View
        className="flex-row justify-start px-4"
        style={{
          alignItems: "center",
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 100,
          width: 300,
          height: 60,
        }}
      >
      <Text >{title}</Text>

        <Picker
          style={{ height: "100%", width: 100}}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          numberOfLines={1}
          itemStyle={{
            height: "100%",
            width: 200,
            fontSize: 20,
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
