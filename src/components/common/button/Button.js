import { TouchableOpacity, Text, View, Pressable } from "react-native";
import buttonStyles from "./button.style";
import React from "react";

const Button = ({ buttonText: text, onPress: onClick }) => {
  return (
    <View>
      <Pressable className="active:opacity-80"
        style={[buttonStyles.button, {width: 300, height: 60}]}
        onPress={onClick}
      >
        <Text style={buttonStyles.btnText}>{text}</Text>
      </Pressable>
    </View>

  );
};

export default Button;
