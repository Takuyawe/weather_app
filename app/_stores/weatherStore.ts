import { create } from "zustand";
import { WeatherDataType } from "../_types/index";

type WeatherStore = {
  weatherData: WeatherDataType | null;
  setWeatherData: (data: WeatherDataType) => void;
};

export const weatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  setWeatherData: (data) => set({ weatherData: data }),
}));
