import React, { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./home.style";
import { DogsList, Button } from "../../components";
import { UserIdContext } from "../../contexts/UserIdContext";
import { getUserDogs } from "../../utils/userDataOperations";

const Home = ({ navigation }) => {
  const { userData } = useContext(UserIdContext);
  const [userName, setUserName] = useState("elad.636@gmail.com");
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDogs, setSelectedDogs] = useState([]);

  useEffect(() => {
    setUserName(userData.name);
    const fetchUserDogs = async () => {
      const userDogs = await getUserDogs(userData.id);
      setLoading(false);

      if (userDogs) {
        console.log("1:" + userDogs);
        setDogs(userDogs);
      }
    };

    fetchUserDogs();
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
    return (
      <View className="flex mt-10 items-center justify-center h-full relative w-full">
        <ActivityIndicator className="absolute bottom-0 top-0 z-50" size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex mt-10 items-center justify-center h-full relative w-full">
 
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
        />
      </View>
    </View>
  );
};

export default Home;
