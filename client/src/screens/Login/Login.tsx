import { createStackNavigator } from "@react-navigation/stack";
import { Register, SignIn, Welcome } from "./index";
import { useEffect } from "react";
import { useStore } from "../../store";

export default function Login({ navigation }) {
  const Stack = createStackNavigator();
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        title: "",
        headerBackTitleVisible: false,
      }}
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
