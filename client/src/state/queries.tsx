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
  deleteDog,
  signIn,
  register,
  followDog,
  unfollowDog,
  getUserFollowings,
} from "../api/api";
import { useStore } from "../store";
import { auth } from "../../firebase";
import { CreationData, Dog } from "../api/types";
import { getNearestDogParks, getUserLocation } from "../api/location";
import { pickImage, uploadImageToStorage } from "../api/utils";

export const useDogs = () => {
  const user = useStore((state) => state.user);
  return useQuery("userDogs", () => getUserDogs(user.id));
};

export const useUser = () => {
  const setUser = useStore((state) => state.setUser);

  return useMutation(
    (userId: string) => {
      return getUser(userId);
    },
    {
      onSuccess: (data) => {
        setUser(data);
      },
    }
  );
};

export const useSignIn = (setWarning: any) => {
  const { mutate: fetchUser } = useUser();

  return useMutation(
    ({ email, password }: { email: string; password: string }) => {
      return signIn(email, password, setWarning);
    },
    {
      onSuccess: (userId) => {
        if (userId) {
          fetchUser(userId);
        }
      },
    }
  );
};

export const useRegister = (setWarning: any) => {
  const { mutate: fetchUser } = useUser();

  return useMutation(
    ({
      email,
      password,
      fullName,
      phoneNumber,
    }: {
      email: string;
      password: string;
      fullName: string;
      phoneNumber: string;
    }) => {
      return register(email, password, fullName, phoneNumber, setWarning);
    },
    {
      onSuccess: (userId) => {
        if (userId) {
          fetchUser(userId);
        }
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
export const useDeleteDog = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (dogId: string) => {
      return deleteDog(dogId);
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
      return removeDogFromPark(dogId, parkId);
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


export const useFollow = () => {
  const queryClient = useQueryClient();
  const user = useStore((state) => state.user);

  return useMutation(
    (dogId: string) => {
      return followDog(user.id, dogId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userFollowings");
      },
    }
  );
};

export const useUnfollow = () => {
  const queryClient = useQueryClient();
  const user = useStore((state) => state.user);

  return useMutation(
    (dogId: string) => {
      return unfollowDog(user.id, dogId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userFollowings");
      },
    }
  );
};


export const useFollowings = () => {
  const user = useStore((state) => state.user);
  return useQuery("userFollowings", () => getUserFollowings(user.id));
};



