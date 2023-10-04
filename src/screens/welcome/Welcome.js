import { View } from "react-native";
import { Button } from "../../components";
import styles from "./welcome.style";

const Welcome = ({ navigation }) => {
  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <Button
        buttonText="Register"
        onPress={handleRegisterPress}
        buttonSize={{ width: 300, height: 50 }}
      ></Button>
      <Button
        buttonText="Log in"
        onPress={() => {}}
        buttonSize={{ width: 300, height: 50 }}
      ></Button>
    </View>
  );
};

export default Welcome;
