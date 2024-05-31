import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./signIn.style";
import { Button } from "react-native-paper";
import { useRegister, useUser } from "../../state/queries";

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
    if (fullName === ""|| email=="" || password === "" || phoneNumber === "")
     {
      setWarning("some of the fields are empty")  
      return;
    }
    try {
      registerMutation.mutateAsync({ email, password, fullName, phoneNumber });
    } catch (error) {}
  };

  return (
    <View className="flex flex-col items-center mt-24">
      <View className="flex flex-col gap-8 items-center ">
        <Text>New Account</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={{ height: 15 }}>
          {warning ? <Text style={{ color: "red" }}>{warning}</Text> : null}
        </View>
        <View>
          <Button
            loading={registerMutation.isLoading}
            mode="contained"
            onPress={handleRegister}
          >
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Register;
