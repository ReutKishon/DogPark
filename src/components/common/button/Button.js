import { TouchableOpacity, Text, View } from "react-native";
import buttonStyles from "./button.style";
import React from "react";

const Button = ({ buttonText: text, onPress, buttonSize: size }) => {
  return (
    <View>
      <TouchableOpacity
        style={[buttonStyles.button, size]}
        onPress={onPress}
      >
        <Text style={buttonStyles.btnText}>{text}</Text>
      </TouchableOpacity>
    </View>

  );
};

export default Button;
