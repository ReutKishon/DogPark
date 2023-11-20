import { firestore } from "../../firebase";

export const getUser = async (id: string) => {
  try {
    const doc = await firestore.collection("users").doc(id).get();

    if (doc.exists) {
      const user = doc.data();
      user["id"] = id;
      return user;
    } else {
      console.log("No such document!");
    }
  } catch (error) {}
};
