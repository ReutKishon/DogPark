import { LocationObject } from "expo-location";
import { create } from "zustand";
import { Park, User, LocationCoords, DogParkPair } from "./api/types";

interface Store {
  liveLocation: LocationCoords;
  dogsInPark: Record<string, string>; // Define dogsInPark as a Record with string keys and string values
  addDogToPark: (dogId: string, parkId: string) => void;
  removeDogFromPark: (dogId: string) => void;
  setLiveLocation: (location: LocationCoords) => void;

  user: User;
  // parks: Park[];
  setUser: (user: User) => void;
  // setParks: (parks: Park[]) => void;
}

export const useStore = create<Store>((set) => ({
  liveLocation: null,
  user: null,
  // parks: [],
  setUser: (user) => set({ user }),
  // setParks: (parks) => set({ parks }),
  setLiveLocation: (liveLocation) => set({ liveLocation }),
  dogsInPark: {},
  addDogToPark: (dogId, parkId) =>
    set((state) => ({
      dogsInPark: { ...state.dogsInPark, [dogId]: parkId },
    })),
  removeDogFromPark: (dogId) =>
    set((state) => {
      const updatedDogsInPark = { ...state.dogsInPark };
      delete updatedDogsInPark[dogId];
      return { dogsInPark: updatedDogsInPark };
    }),
}));
