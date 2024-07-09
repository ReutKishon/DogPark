import { LocationObject } from "expo-location";
import { create } from "zustand";
import { Park, User, LocationCoords, DogParkPair, Dog } from "../types";

interface Store {
  liveLocation: LocationCoords;
  setLiveLocation: (location: LocationCoords) => void;

  user: User;
  parks: Park[];
  setUser: (user: User) => void;
  setParks: (parks: Park[]) => void;
  removeDogFromPark: (parkId: string, dogsId: string) => void;
  addDogToPark: (parkId: string, dogsId: string) => void;
}

export const useStore = create<Store>((set) => ({
  liveLocation: null,
  user: null,
  parks: [],
  setUser: (user) => set({ user }),
  setParks: (parks) => set({ parks }),
  removeDogFromPark: (parkId, dogId) =>
    set((state) => ({
      parks: state.parks.map((park) =>
        park.placeId === parkId
          ? {
              ...park,
              dogsInParkIds: park.dogsInParkIds.filter((id) => id !== dogId),
            }
          : park
      ),
    })),
  addDogToPark: (parkId, dogId) =>
    set((state) => ({
      parks: state.parks.map((park) =>
        park.placeId === parkId
          ? { ...park, dogsInParkIds: { ...park.dogsInParkIds, dogId } }
          : park
      ),
    })),
  setLiveLocation: (liveLocation) => set({ liveLocation }),
}));
