import { LocationObject } from "expo-location";
import { create } from "zustand";
import { Park, User, LocationCoords, DogParkPair, Dog } from "../types";

interface Store {
  liveLocation: LocationCoords;
  setLiveLocation: (location: LocationCoords) => void;
  user: User;
  dogsOnTheMap: Dog[];
  setUser: (user: User) => void;
  setDogsOnTheMap: (dogs: Dog[]) => void;
}

export const useStore = create<Store>((set) => ({
  liveLocation: null,
  user: null,
  setUser: (user) => set({ user }),
  dogsOnTheMap: [],
  setDogsOnTheMap: (dogs) => set({ dogsOnTheMap: dogs }),
  setLiveLocation: (liveLocation) => set({ liveLocation }),
}));
