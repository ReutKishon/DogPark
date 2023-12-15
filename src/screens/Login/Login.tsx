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
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    auth.onAuthStateChanged(async (loggedInUser) => {
      if (loggedInUser) {
        console.log("User is signed in");
        const user = await getUser(loggedInUser.uid);
        if (user == undefined) {
          console.log("User is undefined");
          return;
        }
        console.log("Myuser", user);
        setUser(user);
        navigation.navigate("DrawerNavigation", { screen: "Home" });
      }
    });
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
