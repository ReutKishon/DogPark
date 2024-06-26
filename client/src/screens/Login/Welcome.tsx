import React from "react";
import { Dimensions, ImageBackground, View ,Text} from "react-native";
import { Button } from "react-native-paper";

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground
    source={require('../../assets/images/backgroundTwoDogs.png')}
    style={{justifyContent: "center",alignItems: "center",  width: '100%',height: '100%'}}
    imageStyle={{ resizeMode: "cover",transform: [{scale:1.1},{translateY:30}],width: '100%',height: 760
  }}
  >
    <View className="flex flex-col justify-center items-center gap-3 h-full mt-40 w-full">
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={{ width: 270 ,borderWidth:2 ,backgroundColor:'#90EE90' , borderColor:'#90EE90'}}
        >
          <Text className="font-semibold text-sm color-black">Register</Text>
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          style={{ width: 270 ,backgroundColor:"white" ,borderWidth:2 , borderColor:"white"}}
        >
           <Text className="font-semibold text-sm color-black">Sign In</Text>
        </Button>
    </View>
    </ImageBackground>
  );
};

export default Welcome;
