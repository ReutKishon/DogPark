
import { LocationObject } from 'expo-location';
import { create } from 'zustand'



interface Store {
    location: LocationObject;
    user: any;
    parks: any;
    setUser: (user: any) => void;
    setParks: (parks: any) => void;
    setLocation: (location: any) => void;
}

export const useStore = create<Store>((set) => ({
    location: null,
    user: null,
    parks: [],
    setUser: (user) => set({ user }),
    setParks: (parks) => set({ parks }),
    setLocation: (location) => set({ location }),
}))