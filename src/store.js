
import { create } from 'zustand'

export const useStore = create((set) => ({
    user: null,
    bears: 0,
    setUser: (user) => set({ user }),
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}))