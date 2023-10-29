import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import styles from "./dogsList.style";
import React, { useState, useEffect } from "react";
import DogCard from "../cards/dogCard/dogCard";
import { getUserDogs } from "../../utils/userDataOperations";

const DogsList = ({ navigation, userData, handleNavigate }) => {
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          {dogs?.map((dog) => (
            <DogCard
              dog={dog}
              key={dog?.key}
              handleNavigate={() => {
                handleNavigate(dog);
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DogsList;
