import { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { Animated, useAnimatedValue } from "react-native";
import { useStore } from "../../store";
import { Avatar } from "react-native-paper";
import { getUserLocation } from "../../api/location";

const Map = ({}) => {
  const mapRef = useRef(null);
  const latitudeDelta = useAnimatedValue(0.01);
  const longitudeDelta = useAnimatedValue(0.01);
  const location = useStore((state) => state.liveLocation);
  const setLocation = useStore((state) => state.setLiveLocation);
  const dogsOnTheMap = useStore((state) => state.dogsOnTheMap);

  useEffect(() => {
    (async () => {
      const userLocation = await getUserLocation();
      //console.log("loc " + location.latitude + " " + location.longitude);
      if (userLocation) {
        setLocation(userLocation);

        mapRef.current.animateToRegion(
          {
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          0
        );
        mapRef.current.animatedCamera;
      }
    })();
  }, []);

  const animateZoomIn = () => {
    Animated.parallel([
      Animated.timing(latitudeDelta, {
        toValue: 0.005, // Desired zoom level
        duration: 3000, // Animation duration
        useNativeDriver: true,
      }),
      Animated.timing(longitudeDelta, {
        toValue: 0.005,
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
      {dogsOnTheMap?.map((dog, index) => {
        const offset = 0.002 * index;
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
                  ? { uri: "http://localhost:3000/uploads/" + dog.imageName }
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
