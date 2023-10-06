import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import styles from "./mydogs.style";
import { DogsList } from "../../components";
import React, { useState, useEffect } from "react";
import dogsData from "../../data/dogs.json";

const MyDogs = ({ navigation }) => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    setDogs(dogsData.dogs);
  }, []);

  return <DogsList navigation={navigation} dogs={dogs} />;
};

export default MyDogs;
