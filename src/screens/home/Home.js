import React, { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import styles from "./home.style";
import { DogsList } from "../../components";
import { UserIdContext } from "../../contexts/UserIdContext";

const Home = ({ navigation }) => {
  const { userData } = useContext(UserIdContext);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDogs, setSelectedDogs] = useState([]);

  useEffect(() => {
    setUserName(userData.name);

    setLoading(false);
  }, [userData]);

  const handleDogSelection = (dog) => {
    const isSelected = selectedDogs.includes(dog);
    setSelectedDogs((prevSelectedDogs) =>
      prevSelectedDogs.includes(dog)
        ? prevSelectedDogs.filter((selectedDog) => selectedDog.key !== dog.key)
        : [...prevSelectedDogs, dog]
    );
    dog.isSelected = !isSelected;
  };

  useEffect(() => {
    console.log(selectedDogs);
  }, [selectedDogs]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.helloText}>Hello {userName},</Text>
        <Text style={styles.contentText}>
          It's a good time to take your dog out!
        </Text>
      </View>

      <View style={styles.listContainer}>
        <DogsList
          navigation={navigation}
          userData={userData}
          handleNavigate={handleDogSelection}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Let's travel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
