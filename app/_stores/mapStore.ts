import { create } from "zustand";
import L from "leaflet";
import { LatLng } from "../_types";

interface MapState {
  map: L.Map | null;
  setMap: (map: L.Map | null) => void;
  jumpTo: (lat: number, lng: number) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
  locationName: string;
  setLocationName: (locationName: string) => void;
  location: LatLng | null;
  setLocation: (location: LatLng | null) => void;
}

export const mapStore = create<MapState>((set, get) => ({
  map: null,
  setMap: (map) => set({ map }),
  jumpTo: (lat, lng) => {
    const map = get().map;
    if (map) map.panTo(new L.LatLng(lat, lng));
  },
  isPopupOpen: false,
  setIsPopupOpen: (isPopupOpen) => set({ isPopupOpen }),
  locationName: "",
  setLocationName: (locationName) => set({ locationName }),
  location: null,
  setLocation: (location) => set({ location }),
}));
