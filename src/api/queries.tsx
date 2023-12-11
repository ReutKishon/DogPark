import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import {
  AddDogToUser,
  UploadImageToStorage,
  getNearestDogParks,
  getUserDogs,
  getUserLocation,
  pickImage,
} from "./api";
import { useStore } from "../store";
import { auth } from "../../firebase";

export const useDogs = () => {
  const user = useStore((state) => state.user);
  return useQuery("dogs", () => getUserDogs(user.id));
};

// TODO: Add types

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

// new dog mutation
export const useAddDog = () => {
  const user = useStore((state) => state.user);
  const queryClient = useQueryClient();
  return useMutation(
    (dogData: Dog) => {
      return AddDogToUser(user.id, dogData);
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
      console.log("fetcing parks", location);
      return getNearestDogParks(location.coords);
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
      return UploadImageToStorage(id, imageUrl);
    },
    {
      onSuccess: () => {
        //queryClient.invalidateQueries("dogs");
      },
    }
  );
};

export const usePickImage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return pickImage();
    },
    {
      onSuccess: () => {
        //queryClient.invalidateQueries("dogs");
      },
    }
  );
};
