import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyC0uwBYSX6PD3eTkyhzf1Fq4heW0Ayz5Og",
  authDomain: "dogpark-16030.firebaseapp.com",
  databaseURL: "https://firestore.googleapis.com",
  projectId: "dogpark-16030",
  storageBucket: "dogpark-16030.appspot.com",
  messagingSenderId: "174381801786",
  appId: "1:174381801786:web:05c86075f9ba5667b8b003",
  measurementId: "G-QR4KSSBNSQ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  initializeAuth(firebase.apps[0], {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { auth, firestore, storage };
