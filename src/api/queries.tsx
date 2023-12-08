import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { AddDogToUser, getNearestDogParks, getUserDogs, getUserLocation } from "./api";
import { useStore } from "../store";

export const useDogs = () => {
  const user = useStore((state) => state.user);
  return useQuery("dogs", () => getUserDogs(user.id));
};

// new dog mutation
export const useAddDog = () => {
  const user = useStore((state) => state.user);
  const queryClient = useQueryClient();
  return useMutation(
    (dogData) => {
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
