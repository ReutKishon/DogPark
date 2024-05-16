import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { addDogToUser, getUser, getUserDogs, updateUserDog } from "../api/api";
import { useStore } from "../store";
import { auth } from "../../firebase";
import { CreationData, Dog } from "../api/types";
import { getNearestDogParks, getUserLocation } from "../api/location";
import { pickImage, uploadImageToStorage } from "../api/utils";

export const useDogs = () => {
  const user = useStore((state) => state.user);
  return useQuery("dogs", () => getUserDogs(user.id));
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
        queryClient.invalidateQueries("dogs");
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
        queryClient.invalidateQueries("dogs");
      },
    }
  );
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
