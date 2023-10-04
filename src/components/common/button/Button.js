import { TouchableOpacity, Text } from "react-native";
import buttonStyles from "./button.style";

const Button = ({ buttonText, onPress, buttonSize }) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.button, buttonSize]}
      onPress={onPress}
    >
      <Text style={buttonStyles.btnText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;
