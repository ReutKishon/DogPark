import React, { useState, useCallback } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./addDog.style";
import { auth, firestore } from "../../../firebase";
import { Keyboard } from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";

const AddDog = ({ route }) => {
  const userId = route.params.userId;
  const [dogName, setDogName] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [dogAge, setDogAge] = useState("");

  const handleAddDog = () => {
    const dogData = {
      name: dogName,
      gender: dogGender,
      age: dogAge,
      owner: userId,
    };

    let newDogRef;

    addDoc(collection(firestore, "dogs"), dogData)
      .then((docRef) => {
        newDogRef = docRef;
        updateDoc(doc(firestore, "users", userId), {
          dogs: arrayUnion(newDogRef),
        });
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.error(error);
      });
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
