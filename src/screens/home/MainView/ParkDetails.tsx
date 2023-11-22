import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GetDogsInPark } from "../../../api/parkDataOperations";
import List from "../../../components/List";
import { Button } from "../../../components";
import { Button2 } from "../../../components/common/button/Button";

const DogItem = ({ dog }) => (
  <View className="w-full h-24 flex justify-center p-10">
    <Text>{dog.name}</Text>
  </View>
);

export default function ParkDetails({ navigation, route }) {
  const { park } = route.params;
  const [dogsInThePark, setDogsInThePark] = useState([]);

  useEffect(() => {
    const fetchDogsInPark = async () => {
      const dogs = await GetDogsInPark(park.place_id);
      if (dogs != undefined) {
        setDogsInThePark(dogs);
      }
    };

    fetchDogsInPark();
  }, []);
  return (
    <View className="flex w-full px-4 gap-2">
      <Text className="font-bold text-xl">{park.name}</Text>
      <View>
        <Button2 size="small" text={"Join"} onPress={undefined} />
      </View>
      <List
        data={dogsInThePark}
        renderItem={({ item, index }) => <DogItem dog={item} />}
      />
    </View>
  );
}
