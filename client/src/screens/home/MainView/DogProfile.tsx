import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Avatar, Icon } from "react-native-paper";
import { useFollowings, useUser } from "../../../queries";
import { Dog, LifeStage } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVenus, faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import FollowButton from "../../../components/dogProfile/FollowButton";
import { COLORS } from "../../../constants";
import { useStore } from "../../../store";

const DogDetailCard = ({ text, iconName }) => {
  return (
    <View
      className="ml-[15px] flex-row items-center justify-center rounded-3xl w-[78px] h-[40px] p-3"
      style={{ backgroundColor: COLORS.secondary }}
    >
      <FontAwesomeIcon
        style={{ marginBottom: 3 }}
        icon={iconName}
        size={15}
        color="white"
      />
      <Text
        className="text-[12px] font-bold ml-2 leading-4"
        style={{ color: "white" }}
      >
        {text}
      </Text>
    </View>
  );
};

const DogProfile = ({ route }) => {
  const dog: Dog = route.params.dog;
  const { data: userFollowings } = useFollowings();
  const user = useStore((state) => state.user);

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userFollowings != undefined && Array.isArray(userFollowings)) {
      const followingStatus = userFollowings.length > 0;
      setIsFollowing(followingStatus);
    }
  }, [userFollowings]);
  const dogDetails = [
    { text: dog.gender, iconName: faVenus },
    {
      text: dog.age + " " + (dog.lifeStage == LifeStage.Adult ? "yr" : "mo"),
      iconName: faCakeCandles,
    },
  ];
  return (
    <ScrollView className="flex-grow">
      <ImageBackground
        source={require("../../../assets/images/bg1.png")}
        style={{ width: "100%", height: 100 }}
      >
        <Avatar.Image
          source={{ uri: "http://localhost:3000/uploads/" + dog.imageName }}
          size={100}
          style={{
            borderRadius: 50,
            position: "absolute",
            top: 40,
            left: 29,
          }}
        />
      </ImageBackground>
      <View className="top-3">
        <FollowButton
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          dog={dog}
          isOwner={dog.user_id === user.id}
        />
      </View>

      <View className="relative top-12">
        <Text className="left-12 text-xl font-bold pb-6">{dog.name}</Text>

        <View className="flex flex-wrap flex-row">
          {dogDetails.map((detail, index) => (
            <View key={index} style={{ flexBasis: "30%", margin: "1.5%" }}>
              <DogDetailCard text={detail.text} iconName={detail.iconName} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DogProfile;
