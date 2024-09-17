import { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { Animated, useAnimatedValue } from "react-native";
import { useStore } from "../../store";
import { Avatar } from "react-native-paper";
import { PATH } from "@env";

const Map = () => {
  const mapRef = useRef(null);
  const latitudeDelta = useAnimatedValue(0.001);
  const longitudeDelta = useAnimatedValue(0.001);
  const location = useStore((state) => state.liveLocation);
  const dogsOnTheMap = useStore((state) => state.dogsOnTheMap);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        },
        1000
      );
    }
  }, [location, dogsOnTheMap]);

  const animateZoomIn = () => {
    Animated.parallel([
      Animated.timing(latitudeDelta, {
        toValue: 0.001, // Desired zoom level
        duration: 3000, // Animation duration 3 seconds
        useNativeDriver: true,
      }),
      Animated.timing(longitudeDelta, {
        toValue: 0.001,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <MapView.Animated
      className="w-full h-full"
      ref={mapRef}
      followsUserLocation
      style={{ transform: [{ translateY: -150 }] }}
      initialRegion={{ ...location, latitudeDelta: 0, longitudeDelta: 0 }}
      region={{ ...location, latitudeDelta: 0.002, longitudeDelta: 0.002 }}
      showsUserLocation
      zoomEnabled
      onPress={() => animateZoomIn()}
    >
      {dogsOnTheMap.map((dog, index) => {
        const offset = 0.00006 * index;
        const newLatitude = location?.latitude + offset;
        const newLongitude = location?.longitude + offset;

        // Check if the new coordinates are valid numbers
        if (isNaN(newLatitude) || isNaN(newLongitude)) {
          console.warn(`Invalid coordinates for marker at index ${index}`);
          return null;
        }

        return (
          <Marker
            key={index}
            coordinate={{
              latitude: newLatitude,
              longitude: newLongitude,
            }}
          >
            <Avatar.Image
              size={40}
              source={
                dog.imageName
                  ? { uri: PATH+"/uploads/" + dog.imageName }
                  : { uri: null }
              }
            />
          </Marker>
        );
      })}
    </MapView.Animated>
  );
};

export default Map;
