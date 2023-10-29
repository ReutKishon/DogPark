import { ActivityIndicator } from "react-native";
import styles from "./mydogs.style";
import { DogsList } from "../../components";
import React, { useState, useEffect, useContext } from "react";
import { UserIdContext } from "../../contexts/UserIdContext";

const MyDogs = ({ navigation }) => {
  const { userData } = useContext(UserIdContext);

  const handleNavigate = (dog) => {
    navigation.navigate("DogDetails", { dog });
  };

  return (
    <DogsList
      navigation={navigation}
      userData={userData}
      handleNavigate={handleNavigate}
    />
  );
};

export default MyDogs;
