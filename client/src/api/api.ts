import { useUser } from "../state/queries";
import { CreationData, Dog, LifeStage, User } from "./types";
import axios, { Axios } from "axios";
const PATH = "http://localhost:3000";
//const PATH = process.env.PATH

export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await axios.get(PATH + "/users/getInfo/" + id);
    const userInfo = response.data[0];
    console.log(userInfo);
    const user: User = {
      dogs: [],
      name: userInfo["name"],
      email: userInfo["email"],
      id: userInfo["user_id"],
      imageUrl: "",
    };
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const addDogToUser = async (
  userId: string,
  dogData: CreationData<Dog>
) => {
  try {
    const response = await axios.post(PATH + "/dogs/add", { dogData, userId });
    console.log(response.data);
  } catch (error) {
    console.error("error adding a dog " + error);
  }
};

export const deleteDog = async (dogId: string) => {
  try {
    const response = await axios.delete(PATH + "/dogs/delete/" + dogId);
  } catch (error) {
    console.error("error deleting dog profile " + error);
  }
};

export const getUserDogs = async (userId: string): Promise<Dog[]> => {
  console.log("getting user dogs", userId);
  try {
    const response = await axios.get<Dog[]>(PATH + "/dogs/" + userId);
    let dogs = response.data;

    console.log("My dogs: " + dogs[0].name);

    dogs = await Promise.all(
      dogs.map(async (dog) => {
        try {
          const imageResponse = await axios.get(
            `${PATH}/dogs/dog-image/${dog.id}`
          );
          return {
            ...dog,
            imageUrl: imageResponse.data.imageUrl,
          };
        } catch (error) {
          console.error(`Error fetching image for dog ${dog.id}:`, error);
          return dog; // Return the dog object as is if there's an error
        }
      })
    );

    return dogs;
  } catch (err) {
    throw err;
  }
};

export const updateUserDog = async (dogData: Dog) => {
  const dogId = dogData.id;
  console.log("dogId:" + dogId);
  console.log(dogData);
  try {
    const response = await axios.put(PATH + "/dogs/update/" + dogId, {
      dogData,
    });
    console.log(response.data);
  } catch (error) {
    console.error("error updating a dog " + error);
  }
};

export const addDogToPark = async (dogId: string, parkId: string) => {
  try {
    await axios.put(PATH + "/parks/enter/" + parkId + "/" + dogId);
  } catch (error) {
    console.error("Error update dog current park:", error);
  }
};

export const removeDogFromPark = async (dogId: string, parkId: string) => {
  try {
    await axios.put(PATH + "/parks/exit/" + parkId + "/" + dogId);
  } catch (error) {
    console.error("Error update dog current park:", error);
  }
};

export const getDogsInPark = async (parkId: string): Promise<Array<Dog>> => {
  try {
    const response = await axios.get(PATH + "/parks/" + parkId);
    const dogs = response.data;
    return dogs;
    console.log("playing:" + response.data.length);
  } catch (error) {
    console.error("Error fetching dog data:", error);
    return null;
  }
};

export const signIn = async (
  email: string,
  password: string,
  setWaring: any
): Promise<string> => {
  try {
    const loggedUser = await axios.post(PATH + "/auth/signIn/", {
      email,
      password,
    });
    if (loggedUser.status == 200) {
      setWaring("");
      return loggedUser.data.userId;
    }
  } catch (error) {
    setWaring(error.response.data.error);
    return null;
  }
};

export const register = async (
  email: string,
  password: string,
  fullName: string,
  phoneNumber: string,
  setWaring: any
): Promise<string> => {
  try {
    const loggedUser = await axios.post(PATH + "/auth/register/", {
      email,
      password,
      fullName,
      phoneNumber,
    });
    if (loggedUser.status == 200) {
      setWaring("");
      return loggedUser.data.userId;
    }
  } catch (error) {
    setWaring(error.response.data.error);
    return null;
  }
};

export const followDog = async (userId: string, dogId: string) => {
  try {
    await axios.post(PATH + "/follow/follow/" + userId + "/" + dogId);
  } catch (error) {
    console.error("Error follow dog:", error);
  }
};

export const unfollowDog = async (userId: string, dogId: string) => {
  try {
    await axios.delete(PATH + "/follow/unfollow/" + userId + "/" + dogId);
  } catch (error) {
    console.error("Error unfollow dog:", error);
  }
};

export const getUserFollowings = async (userId: string) => {
  try {
    await axios.get(PATH + "/follow/followings/" + userId);
  } catch (error) {
    console.error("Error geting user followings:", error);
  }
};
