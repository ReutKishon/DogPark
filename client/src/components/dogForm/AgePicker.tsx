import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { LifeStage } from "../../types";

const AgePicker = ({ dogAge, dogLifeStage, setDogAge }) => {
  const [age, setAge] = useState(dogAge);

  useEffect(() => {
    if (dogLifeStage == LifeStage.Puppy) {
      setAge(dogAge / 12);
    } else {
      setAge(dogAge);
    }
  });

  const formatAge = (value: number) => {
    if (value < 1) {
      const months = Math.round(value * 12);
      return `${months} mo`;
    }
    const years = Math.floor(value);
    return `${years} yr`;
  };

  const onSlidingComplete = (value: number) => {
    if (value < 1) {
      setDogAge(value.toFixed(2));
    } else {
      setDogAge(Math.round(value));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text style={styles.textLeft}>3 mo</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.25} // 3 months in years
          maximumValue={15} // 15 years
          step={0.01}
          value={age}
          onValueChange={(value) => {
            setAge(value);
          }}
          onSlidingComplete={(value) => {
            onSlidingComplete(value);
          }}
          minimumTrackTintColor="#1FB28A"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1FB28A"
        />
        <Text style={styles.textRight}>15 yr</Text>
      </View>
      <Text style={styles.ageText}>{formatAge(age)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "110%",
  },
  slider: {
    flex: 1,
  },
  textLeft: {
    marginRight: 10,
  },
  textRight: {
    marginLeft: 10,
  },
  ageText: {
    marginTop: 1,
    fontSize: 13,
  },
});

export default AgePicker;
