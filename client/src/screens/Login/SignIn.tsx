import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { Button } from "react-native-paper";
import { useSignIn } from "../../queries";
import { COLORS } from "../../constants";
import commonStyles from "../../styles/commonStyle";
import { USER_EMAIL, USER_PASSWORD } from "@env";

const SignIn = () => {
  const [email, setEmail] = useState(USER_EMAIL);
  const [password, setPassword] = useState(USER_PASSWORD);
  const [warning, setWarning] = useState("");
  const signInMutation = useSignIn((errorMessage) => {
    setWarning(errorMessage);
  });

  const handleSignIn = async () => {
    try {
      signInMutation.mutateAsync({ email, password });
    } catch (error) {}
  };

  const imageUrl =
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXV1aTB4anp3YmJkNzJiZmI0Y2JmdWp1emxldTF1bjVsMmw2ZGVqOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fxOcPNZkLa68iQ52l9/giphy.gif";
  // "https://media1.giphy.com/media/k6sC1yPY1fhbKzXdY4/giphy.gif?cid=ecf05e47gtkcg6y1tqza7sfmcmrcwos2vge6avgzgn2vmf04&ep=v1_stickers_search&rid=giphy.gif&ct=s";

  return (
    <View className="flex items-center mt-5">
      <Text className="text-2xl font-semibold mb-2">Login</Text>

      <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
      <View className="flex flex-col gap-8 items-center mt-1">
        <TextInput
          style={commonStyles.inputbox}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={commonStyles.inputbox}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <View style={{ height: 15 }}>
          {warning ? <Text style={{ color: "red" }}>{warning}</Text> : null}
        </View>

        <Button
          loading={signInMutation.isLoading}
          mode="contained"
          onPress={handleSignIn}
          className="w-[270px]"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Text className="font-bold text-m color-white">Log In</Text>
        </Button>
      </View>
      <Image
        source={require("../../assets/images/garden.png")}
        className="h-[350px] w-[1200px] mt-[40px]"
      />
    </View>
  );
};

export default SignIn;
