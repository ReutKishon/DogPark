
import { create } from 'zustand'

export const useStore = create((set) => ({
    user: null,
    parks: [],
    setUser: (user) => set({ user }),
    setNearParks: (parks) => set({ parks }),
}))