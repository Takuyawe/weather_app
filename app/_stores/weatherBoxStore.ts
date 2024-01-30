import { create } from "zustand";

type WeatherBoxStore = {
  isBoxOpen: boolean;
  setIsBoxOpen: (isBoxOpen: boolean) => void;
};

export const weatherBoxStore = create<WeatherBoxStore>((set) => ({
  isBoxOpen: false,
  setIsBoxOpen: (isBoxOpen) => set({ isBoxOpen }),
}));
