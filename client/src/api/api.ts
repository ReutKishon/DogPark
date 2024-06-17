import { useUser } from "../state/queries";
import { CreationData, Dog, LifeStage, User } from "./types";
import axios, { Axios } from "axios";
const PATH = "http://192.168.1.171:3000";
//const PATH = process.env.PATH

export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await axios.get(PATH + "/users/getInfo/" + id);
    const userInfo = response.data;
    console.log(userInfo);
    const user: User = {
      dogs: [],
      name: userInfo["name"],
      email: userInfo["email"],
      id:id,
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
    await axios.delete(PATH + "/dogs/delete/" + dogId);
  } catch (error) {
    console.error("error deleting dog profile " + error);
  }
};

export const getUserDogs = async (userId: string): Promise<Dog[]> => {
  try {
    const response = await axios.get<Dog[]>(PATH + "/dogs/userDogs/" + userId);
    let dogs = response.data;

    dogs = await Promise.all(
      dogs.map(async (dog) => {
        return {
          ...dog,
          imageUrl: "",
        };
      })
    );

    return dogs;
  } catch (err) {
    throw err;
  }
};

export const getDog = async (dogId: number): Promise<Dog> => {
  try {
    const response = await axios.get(PATH + "/dogs/" + dogId);
    const dogInfo = response.data[0];
    console.log("dogInfo: ",dogInfo);
    const dog: Dog = {
      id: dogInfo["id"],
      name: dogInfo["name"],
      age: dogInfo["age"],
      lifeStage: dogInfo["lifeStage"],
      gender: dogInfo["gender"],
      ownerId: dogInfo["user_id"],
      imageUrl: "",
    };
    return dog;
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
  setWarning: (warning:string)=>void
): Promise<string> => {
  try {
    const loggedUser = await axios.post(PATH + "/auth/register/", {
      email,
      password,
      fullName,
      phoneNumber,
    });
    if (loggedUser.status == 200) {
      setWarning("");
      return loggedUser.data.userId;
    }
  } catch (error) {
    setWarning(error.response.data.error);
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

export const getUserFollowings = async (userId: string): Promise<Dog[]> => {
  try {
    const response = await axios.get(PATH + "/follow/followings/" + userId);
    let followingDogs = response.data.result;
    if (followingDogs !== undefined) {
      followingDogs = await Promise.all(
        followingDogs.map(async (item: any) => {
          try {
            const dog = await getDog(item.dog_id);
            return dog;
          } catch (error) {
            console.error(
              `Error fetching dog for dog_id ${item.dog_id}:`,
              error
            );
            return null;
          }
        })
      );
    }
    console.log("result3", followingDogs);
    return followingDogs;
  } catch (error) {
    throw error;
  }
};
