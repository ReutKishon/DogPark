import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from '../../components';
import { COLORS, SIZES } from "../../constants";
import styles from "./register.style";

const Register = () => {
  const [dogName, setDogName] = useState("");
  const [gender, setGender] = useState("female");
  const [notes, setNotes] = useState("");

  // Function to handle the "Create Account" button press
  const handleCreateAccount = () => {
    // You can perform actions with the input values here
    console.log("Dog Name:", dogName);
    console.log("Gender:", gender);
    console.log("Notes:", notes);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="Enter your dog name"
        value={dogName}
        onChangeText={(text) => setDogName(text)}
      />

      <Picker
        style={styles.picker}
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Male" value="male" />
      </Picker>

      <TextInput
        style={[styles.inputText, { height: 200 }]}
        placeholder="Enter here important things to know about your dog"
        multiline
        numberOfLines={5}
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />
        
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: SIZES.xxxLarge,
          // backgroundColor: "#FFF",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Button
          buttonText="Create Account"
          onPress={handleCreateAccount}
          buttonSize={{ width: 300, height: 50 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;
