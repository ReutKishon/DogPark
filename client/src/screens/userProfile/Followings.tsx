import { View, Text } from "react-native";
import { List, DogCard } from "../../components/common";
import { IconButton } from "react-native-paper";
import { useFollowings } from "../../queries";

export default function Followings({ navigation,route }) {
  const { handleCloseModal } = route.params;
  const { data: userFollowings } = useFollowings();

  return (
    <View className="flex w-full px-4 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="text-2xl font-bold2">Followings</Text>
        <IconButton
          icon={"close"}
          size={18}
          mode="contained"
          onPress={() => handleCloseModal()}
        />
      </View>
      <List
        data={userFollowings}
        renderItem={({ item }) => (
          <DogCard
            dog={item}
            onpress={() => {
              navigation.navigate("DogProfile", { dog: item });
            }}
          />
        )}
      />
    </View>
  );
}
