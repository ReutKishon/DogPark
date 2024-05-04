import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase";

export const uploadImageToStorage = async (id: string, imagePath: Blob) => {
  try {
    const path = "images/" + id;
    await storage.ref(path).put(imagePath);

    const url = await storage.ref(path).getDownloadURL();

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

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
