import { createStackNavigator } from "@react-navigation/stack";
import Register from "./Register";
import SignIn from "./SignIn";
import Welcome from "./Welcome";
import { useEffect } from "react";
import { auth } from "../../../firebase";
import { getUser } from "../../api/api";
import { useStore } from "../../store";

export default function Login({ navigation }) {
  const Stack = createStackNavigator();
  const user = useStore((state) => state.user);

  // useEffect(() => {
  //   auth.onAuthStateChanged(async (loggedInUser) => {
  //     if (loggedInUser) {
  //       console.log("User is signed in");
  //       const user = await getUser(loggedInUser.uid);
  //       if (user == undefined) {
  //         console.log("User is undefined");
  //         return;
  //       }
  //       console.log("Myuser", user);
  //       setUser(user);
  //       navigation.navigate("Home");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false, title:"",headerBackTitleVisible: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
