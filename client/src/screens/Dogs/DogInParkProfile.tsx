import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import { Avatar, Icon } from "react-native-paper";
import { useFollowings, useUser } from "../../state/queries";
import { Dog, LifeStage } from "../../api/types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVenus, faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import FollowButton from "../../components/FollowButton";

const DogDetailCard = ({ text, iconName }) => {
  return (
    <View className="flex-row items-center space-y-4">
      <FontAwesomeIcon
        style={{ marginTop: 15 }}
        icon={iconName}
        size={12}
        color="purple"
      />
      <Text className="text-l ml-2">{text}</Text>
    </View>
  );
};

const DogInParkProfile = ({ route }) => {
  const dog: Dog = route.params.dog;
  const { data: userFollowings } = useFollowings();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userFollowings != undefined && Array.isArray(userFollowings)) {
      const followingStatus = userFollowings.length > 0;
      setIsFollowing(followingStatus);
    }
  }, [userFollowings]);

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/images/bg1.png")}
        style={{ width: "100%", height: 100 }}
      >
        <Avatar.Image
          source={{ uri: dog.imageUrl }}
          size={100}
          style={{
            borderRadius: 50,
            position: "absolute",
            top: 40,
            left: 20,
          }}
        />
      </ImageBackground>
      <View className="top-3">
        <FollowButton isFollowing={isFollowing} setIsFollowing={setIsFollowing} dog={dog} />
      </View>

      <View className="relative top-12">
        <Text className="left-9 text-xl font-bold">{dog.name}</Text>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: "gray",
            marginBottom: 10,
            marginTop: 10,
            width: "100%",
          }}
        />

        <View className="left-9 mt-1">
          <DogDetailCard text={dog.gender} iconName={faVenus} />
          <DogDetailCard
            text={
              dog.age +
              " " +
              (dog.lifeStage == LifeStage.Adult ? "years old" : "months")
            }
            iconName={faCakeCandles}
          />
        </View>
      </View>
    </View>
  );
};

export default DogInParkProfile;
