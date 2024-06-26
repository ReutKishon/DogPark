import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { Button } from "react-native-paper";
import { useRegister, useUser } from "../../state/queries";
import { COLORS } from "../../constants/theme";
import commonStyles from "../../styles/commonStyle";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [warning, setWarning] = useState("");
  const registerMutation = useRegister((warning: string) => {
    setWarning(warning);
  });

  const handleRegister = async () => {
    if (
      fullName === "" ||
      email == "" ||
      password === "" ||
      phoneNumber === ""
    ) {
      setWarning("some of the fields are empty");
      return;
    }
    try {
      registerMutation.mutateAsync({ email, password, fullName, phoneNumber });
    } catch (error) {}
  };
  const imageUrl =
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTI2cTU4eDdidnVtYXgzNWRmMW44aDJzZTlhdTlzeXhhdjhkMnZvcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9r2Yflv0PDievgiKRi/giphy.gif";
  return (
    <View className="flex items-center">
      <Text className="text-2xl font-semibold mb-2">New Account</Text>
      <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
      <View className="flex flex-col gap-8 items-center pt-2">
        <TextInput
          style={commonStyles.inputbox}
          placeholder="name"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={commonStyles.inputbox}
          placeholder="phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="email"
          style={commonStyles.inputbox}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={commonStyles.inputbox}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={{ height: 20 }}>
          {warning ? <Text style={{ color: "red" }}>{warning}</Text> : null}
        </View>

        <Button
          loading={registerMutation.isLoading}
          mode="contained"
          onPress={handleRegister}
          className="w-[270px]"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Text className="font-bold text-m color-white">Register</Text>
        </Button>
      </View>
    </View>
  );
};

export default Register;
