import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { COLORS } from "../../constants";

const OptionButton = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: 70,
          padding: 8,
          borderRadius: 15,
          borderColor: "#333",
          borderWidth: 1,
        },
        isActive && {
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
        },
      ]}
      onPress={() => onPress()}
    >
      <View className="flex items-center justify-center">
        <Text style={isActive && { color: "white" }} className="font-semibold">
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OptionButton;
