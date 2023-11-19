import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./signIn.style";
import { auth, firestore } from "../../../firebase";
import { UserIdContext } from "../../contexts/UserIdContext";
import { UserDataContext } from "../../contexts/UserDataContext";
import { Button } from "../../components";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("elad.636@gmail.com");
  const [password, setPassword] = useState("Elad9352221");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserData } = useContext(UserIdContext);
  //const { setUserData } = useContext(UserDataContext);
  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        const userId = user.uid;

        setErrorMessage("");
        firestore
          .collection("users")
          .doc(userId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              docData = doc.data();
              docData["id"] = userId;
              console.log(docData);
              setUserData(docData);
              navigation.navigate("DrawerNavigation", { screen: "Home" });
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Please enter a valid email address");
        } else if (error.code === "auth/invalid-login-credentials") {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
        //console.error(error);
      });
  };

  return (
    <View className="flex flex-col items-center justify-end gap-">

      <View>
        <Text className="text-4xl mt-24" >Sign In</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <View>
        <Button
          buttonText="Sign in"
          onPress={handleSignIn}
          buttonSize={{ width: 300, height: 50 }}
        />
      </View>
    </View>
  );
};

export default SignIn;
