
import { create } from 'zustand'

export const useStore = create((set) => ({
    location: null,
    user: null,
    parks: [],
    dogs: [],
    setUser: (user) => set({ user }),
    setDogs: (dogs) => set({ dogs }),
    setParks: (parks) => set({ parks }),
    setLocation: (location) => set({ location }),
}))