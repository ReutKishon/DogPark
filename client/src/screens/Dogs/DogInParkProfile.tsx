import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Button,
  ScrollView,
} from "react-native";
import { Avatar, Icon } from "react-native-paper";
import { useFollowings, useUser } from "../../state/queries";
import { Dog } from "../../api/types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVenus, faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import FollowButton from "../../components/FollowButton";
import { COLORS } from "../../constants";

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
  const dogDetails = [
    { text: "Male", iconName: faVenus },
    { text: "2 yr", iconName: faCakeCandles },
    { text: "2 mo", iconName: faCakeCandles },
    { text: "2 y", iconName: faCakeCandles },
  ];
  return (
    <ScrollView className="flex-grow">
      <ImageBackground
        source={require("../../assets/images/bg1.png")}
        style={{ width: "100%", height: 100 }}
      >
        <Avatar.Image
          source={{ uri: dog.imageName }}
          size={100}
          style={{
            borderRadius: 50,
            position: "absolute",
            top: 40,
            left: 20,
            backgroundColor: COLORS.secondary,
            borderColor: COLORS.primary,
            borderWidth:3
          }}
        />
      </ImageBackground>
      <View className="top-3">
        <FollowButton
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          dog={dog}
        />
      </View>

      <View className="relative top-12">
        <Text className="left-9 text-xl font-bold pb-6">{dog.name}</Text>

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

export default DogInParkProfile;
