import { LocationObject } from "expo-location";
import { create } from "zustand";
import { Park, User, LocationCoords, DogParkPair } from "../types";

interface Store {
  liveLocation: LocationCoords;
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
}));
