import { useQuery, useMutation, useQueryClient } from "react-query";
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
import { CreationData, Dog } from "../types";
import { getNearestDogParks, getUserLocation } from "../api/location";



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

export const useDogs = () => {
  const user = useStore((state) => state.user);
  return useQuery("userDogs", () => getUserDogs(user.id));
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

export const useDogsInPark = (parkId: string) => {
  const setDogsOnTheMap = useStore((state) => state.setDogsOnTheMap);

  return useQuery(["dogsInPark", parkId], () => getDogsInPark(parkId), {
    onSuccess: (data) => {
      setDogsOnTheMap(data);
    },
  });
};


export const useAddDogToPark = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      dogId,
      parkId,
      previousParkId,
    }: {
      dogId: string;
      parkId: string;
      previousParkId: string;
    }) => {
      return addDogToPark(dogId, parkId);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["dogsInPark", variables.parkId]);
        if (variables.previousParkId) {
          queryClient.invalidateQueries([
            "dogsInPark",
            variables.previousParkId,
          ]);
        }
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

export const useLocation = () => {
  return useQuery("location", () => getUserLocation());
};

export const useParks = () => {
  const { data: location } = useLocation();
  // const setParks = useStore((state) => state.setParks);
  return useQuery(
    "parks",
    () => {
      return getNearestDogParks(location);
    },
    {
      enabled: !!location,
      onSuccess: (data) => {
        // setParks(data);
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
          console.log(`User ${userId}`);
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
