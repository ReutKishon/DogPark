import { ActivityIndicator } from "react-native";
import styles from "./mydogs.style";
import { DogsList } from "../../components";
import React, { useState, useEffect, useContext } from "react";
import { getUserDogs } from "../../utils/userDataOperations";

const MyDogs = ({ navigation }) => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDogs = async () => {
      const userDogs = await getUserDogs(userData.id);
      if (userDogs) {
        setDogs(userDogs);
        setLoading(false);
      }
    };

    fetchUserDogs();
  }, [userData]);

  const handleDogPress = (dog) => {
    navigation.navigate("DogDetails", { dog });
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return <DogsList dogs={dogs} handleDogPress={handleDogPress} />;
};

export default MyDogs;
