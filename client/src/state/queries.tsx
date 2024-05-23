import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import {
  addDogToPark,
  addDogToUser,
  getDogsInPark,
  getUser,
  getUserDogs,
  removeDogFromPark,
  updateUserDog,
} from "../api/api";
import { useStore } from "../store";
import { auth } from "../../firebase";
import { CreationData, Dog } from "../api/types";
import { getNearestDogParks, getUserLocation } from "../api/location";
import { pickImage, uploadImageToStorage } from "../api/utils";

const config = {
  bucketName: "myBucket",
  dirName: "photos" /* optional */,
  region: "eu-west-1",
  accessKeyId: "ANEIFNENI4324N2NIEXAMPLE",
  secretAccessKey: "cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE",
};

export const useDogs = () => {
  const user = useStore((state) => state.user);
  return useQuery("userDogs", () => getUserDogs(user.id));
};

export const useUser = () => {
  return useMutation(
    (userId: string) => {
      return getUser(userId);
    },
    {
      onSuccess: () => {
        console.log("getUser");
      },
    }
  );
};

export const useSignIn = () => {
  return useMutation(
    ({ email, password }: { email: string; password: string }) => {
      return auth.signInWithEmailAndPassword(email, password);
    },
    {
      onSuccess: () => {
        console.log("Signed in");
      },
    }
  );
};

export const useAddDog = () => {
  const user = useStore((state) => state.user);
  const queryClient = useQueryClient();
  return useMutation(
    (dogData: Dog) => {
      return addDogToUser(user.id, dogData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userDogs");
      },
    }
  );
};

export const useUpdateDog = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (dogData: Dog) => {
      return updateUserDog(dogData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userDogs");
      },
    }
  );
};

export const useAddDogToPark = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ dogId, parkId }: { dogId: string; parkId: string }) => {
      return addDogToPark(dogId, parkId);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["dogsInPark", variables.parkId]);
      },
    }
  );
};

export const useRemoveDogFromPark = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ dogId, parkId }: { dogId: string; parkId: string }) => {
      return removeDogFromPark(dogId);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["dogsInPark", variables.parkId]);
      },
    }
  );
};

export const useDogsInPark = (parkId: string) => {
  return useQuery(["dogsInPark", parkId], () => getDogsInPark(parkId));
};

export const useLocation = () => {
  return useQuery("location", () => getUserLocation());
};

export const useParks = () => {
  const { data: location } = useLocation();
  return useQuery(
    "parks",
    () => {
      return getNearestDogParks(location);
    },
    { enabled: !!location }
  );
};

export const useUploadImage = () => {
  const user = useStore((state) => state.user);
  const userId = user.id;
  const lastIndexDog = user.dogs.length;
  const id = userId + lastIndexDog;
  return useMutation(
    (imageUrl: Blob) => {
      return uploadImageToStorage(id, imageUrl);
    },
    {
      onSuccess: () => {
        //queryClient.invalidateQueries("dogs");
      },
    }
  );
};

export const usePickImage = () => {
  return useMutation(
    () => {
      return pickImage();
    },
    {
      onSuccess: () => {},
    }
  );
};
