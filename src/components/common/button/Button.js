import { TouchableOpacity, Text, View } from "react-native";
import buttonStyles from "./button.style";
import React from "react";

const Button = ({ buttonText: text, onPress: onClick }) => {
  return (
    <View>
      <TouchableOpacity
        style={[buttonStyles.button, {width: 300, height: 60}]}
        onPress={onClick}
      >
        <Text style={buttonStyles.btnText}>{text}</Text>
      </TouchableOpacity>
    </View>

  );
};

export default Button;
