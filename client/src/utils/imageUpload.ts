import * as ImagePicker from "expo-image-picker";


export const pickImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        return result.assets[0].uri;
      }
    }
  } catch (error) {
    console.error("error: " + error);
  }
};
