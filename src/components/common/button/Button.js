import { TouchableOpacity, Text, View, Pressable } from "react-native";
import buttonStyles from "./button.style";
import React from "react";

const Button = ({ buttonText: text, onPress: onClick, children }) => {
  return (
    <View>
      <Pressable className="active:opacity-80"
        style={[buttonStyles.button,]}
        onPress={onClick}
      >
        <Text style={buttonStyles.btnText}>{text}</Text>
        {children}
      </Pressable>
    </View>

  );
};


export const Button2 = ({ onPress: onClick, children, className, size, text }) => {

  const dimensions = { width: 300, height: 50 };
  if (size === "small") {
    dimensions.width = 80;
    dimensions.height = 33;
  }
  else if (size === "large") {
    dimensions.width = 400;
    dimensions.height = 70;
  }



  return (
    <Pressable className="active:opacity-90"
      onPress={onClick}
    >
      <View className={"flex justify-center items-center " + className} style={[dimensions, buttonStyles.button,]}>
        {text && <Text style={{ fontSize: 12 }} className="text-white"> {text}</Text>}
        {children}
      </View>
    </Pressable>

  );
}

export default Button;
