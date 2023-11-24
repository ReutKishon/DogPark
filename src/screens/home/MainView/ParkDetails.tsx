import { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { GetDogsInPark, AddDogsToPark } from "../../../api/parkDataOperations";
import List from "../../../components/List";
import { Button } from "../../../components";
import { Button2 } from "../../../components/common/button/Button";
import { Avatar } from "tamagui";
import { useStore } from "../../../store";

const DogItem = ({ dog }) => (
  <View className="w-full h-40 flex justify-center p-5 gap-2">
    <Text className="font-bold text-xl">{dog.name}</Text>
    <Text>{dog.gender}</Text>
    <Text>{dog.age} years old</Text>
  </View>
);

const DogsIconsList = ({ dogs, handleIconPress, selectedDogs }) => (
  <FlatList
    data={dogs}
    horizontal={true}
    renderItem={({ item, index }) => (
      <Pressable onPress={() => handleIconPress(index)}>
        <View style={{ opacity: selectedDogs.includes(index) ? 1 : 0.5 }}>
          <Avatar circular size="$6">
            <Avatar.Image src="http://placekitten.com/200/300" />
          </Avatar>
        </View>
      </Pressable>
    )}
    ItemSeparatorComponent={() => {
      return (
        <View
          style={{
            width: 12,
          }}
        />
      );
    }}
  ></FlatList>
);

export default function ParkDetails({ navigation, route }) {
  const { park } = route.params;
  const [dogsInThePark, setDogsInThePark] = useState([]);
  const dogs = useStore((state) => state.dogs);
  const [selectedDogs, setSelectedDogs] = useState([]);

  const fetchDogsInPark = async () => {
    const dogs = await GetDogsInPark(park.place_id);
    if (dogs != undefined) {
      setDogsInThePark(dogs);
    }
  };

  useEffect(() => {
    fetchDogsInPark();
  }, []);

  const handleIconPress = (index) => {
    setSelectedDogs((prevSelectedDogs) => {
      if (prevSelectedDogs.includes(index)) {
        return prevSelectedDogs.filter((dogIndex) => dogIndex !== index);
      } else {
        return [...prevSelectedDogs, index];
      }
    });
  };

  const handleJoinPress = async () => {
    const dogsKeys = selectedDogs.map((dogIndex) => dogs[dogIndex].key);
    await AddDogsToPark(park.place_id, dogsKeys);
    await fetchDogsInPark();
  };

  return (
    <View className="flex w-full px-4 gap-2">
      <View className="py-1 my-3">
        <DogsIconsList
          dogs={dogs}
          handleIconPress={handleIconPress}
          selectedDogs={selectedDogs}
        />
      </View>
      <Text className="font-bold text-xl">{park.name}</Text>
      <View>
        <Button2 size="small" text={"Join"} onPress={handleJoinPress} />
      </View>
      <List
        data={dogsInThePark}
        renderItem={({ item, index }) => <DogItem dog={item} />}
      />
    </View>
  );
}
