import { LocationObject } from "expo-location";
import { create } from "zustand";
import { Park, User,LocationCoords } from "./api/types";

interface Store {
  location: LocationCoords;
  user: User;
  parks: Park[];
  setUser: (user: User) => void;
  setParks: (parks: Park[]) => void;
  setLocation: (location: LocationCoords) => void;
}

export const useStore = create<Store>((set) => ({
  location: null,
  user: null,
  parks: [],
  setUser: (user) => set({ user }),
  setParks: (parks) => set({ parks }),
  setLocation: (location) => set({ location }),
}));
