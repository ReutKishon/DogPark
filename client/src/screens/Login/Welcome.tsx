import React from "react";
import { Dimensions, ImageBackground, View ,Text} from "react-native";
import { Button } from "react-native-paper";
import welcomeBackground from '../../assets/images/backgroundTwoDogs.png';

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground
    source={welcomeBackground}
    style={{justifyContent: "center",alignItems: "center",  width: '100%',height: '100%'}}
    imageStyle={{ resizeMode: "cover",transform: [{scale:1.1},{translateY:4}],width: '100%',height: '100%'
  }}
  >
    <View className="flex flex-col justify-center items-center gap-3 h-full mt-40 w-full">
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={{ width: 270 ,borderWidth:2 }}
        >
          <Text className="font-semibold text-sm">Register</Text>
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          style={{ width: 270 ,backgroundColor:"white" ,borderWidth:2 , borderColor:"white"}}
        >
           <Text className="font-semibold text-sm">Sign In</Text>
        </Button>
    </View>
    </ImageBackground>
  );
};

export default Welcome;
