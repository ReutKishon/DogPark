import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import {
  AddDogToUser,
  getUserDogs,
  writeFollowersDocument,
  writeFollowingDocument,
} from "../api/api";
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
  const user = useStore((state) => state.user);
  return useQuery("dogs", () => getUserDogs(user.id));
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
    (dogData: CreationData<Dog>) => {
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

export const useFollow = () => {
  const user = useStore((state) => state.user);
  const queryClient = useQueryClient();
  return useMutation(
    (userIdToFollow: string) => {
      return writeFollowersDocument(user.id, userIdToFollow);
    },
    {
      onSuccess: () => {
        // queryClient.invalidateQueries("followers");
        // queryClient.invalidateQueries("following")
      },
    }
  );
};
