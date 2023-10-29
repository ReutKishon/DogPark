import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./addDog.style";
import { auth, firestore } from "../../../firebase";
import { Keyboard } from "react-native";
import { UserIdContext } from "../../contexts/UserIdContext";
import { AddDogToUser } from "../../utils/userDataOperations";

const AddDog = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserIdContext);
  const [dogName, setDogName] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [dogAge, setDogAge] = useState("");

  const handleAddDog = async () => {
    if (dogName == "" || dogGender == "" || dogAge == "") {
      alert("some data is missing!");
      return;
    }
    const dogData = {
      name: dogName,
      gender: dogGender,
      age: dogAge,
      owner: userData.id,
    };
    await AddDogToUser(userData, setUserData, dogData);
    Keyboard.dismiss();
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Dog</Text>
      <TextInput
        style={styles.input}
        placeholder="Dog Name"
        value={dogName}
        onChangeText={setDogName}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={dogGender}
        onChangeText={setDogGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={dogAge}
        onChangeText={setDogAge}
        keyboardType="numeric"
      />
      <Button title="Add Dog" onPress={handleAddDog} />
    </View>
  );
};

export default AddDog;
