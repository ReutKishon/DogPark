import React, { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./home.style";
import { DogsList, Button } from "../../components";
import { UserIdContext } from "../../contexts/UserIdContext";
import { getUserDogs } from "../../utils/userDataOperations";

const Home = ({ navigation }) => {
  const { userData } = useContext(UserIdContext);
  const [userName, setUserName] = useState("");
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDogs, setSelectedDogs] = useState([]);

  useEffect(() => {
    setUserName(userData.name);
    const fetchUserDogs = async () => {
      const userDogs = await getUserDogs(userData.id);
      if (userDogs) {
        setDogs(userDogs);
        setLoading(false);
      }
    };

    fetchUserDogs();
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
        <DogsList dogs={dogs} handleDogPress={handleDogSelection} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonText="Let's travel"
          onPress={() => {
            navigation.navigate("Parks", { selectedDogs });
          }}
          buttonSize={{ width: 300, height: 50 }}
        ></Button>
      </View>
    </View>
  );
};

export default Home;
