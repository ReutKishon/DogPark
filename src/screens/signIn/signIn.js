import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, useWindowDimensions, Image } from "react-native";
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
  const imageUrl = 'https://media1.giphy.com/media/k6sC1yPY1fhbKzXdY4/giphy.gif?cid=ecf05e47gtkcg6y1tqza7sfmcmrcwos2vge6avgzgn2vmf04&ep=v1_stickers_search&rid=giphy.gif&ct=s';
  const { width } = useWindowDimensions();

  return (
    <View className="flex flex-col items-center mt-24">
      <View className="flex flex-col gap-8 items-center ">
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />

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
          />
        </View>
      </View>
    </View>
  );
};

export default SignIn;
