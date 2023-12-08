
import { create } from 'zustand'

export const useStore = create((set) => ({
    location: null,
    user: null,
    parks: [],
    setUser: (user) => set({ user }),
    setParks: (parks) => set({ parks }),
    setLocation: (location) => set({ location }),
}))