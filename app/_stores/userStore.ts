import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { Favorites } from "../_types";

type UserStore = {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  favorites: Favorites[] | null;
  setFavorites: (favorites: Favorites[] | null) => void;
  addFavorites: (newFavorite: Favorites) => void;
  removeFavorites: (locationName: string, owner: string) => void;
};

export const userStore = create<UserStore>((set) => ({
  isSignedIn: false,
  setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
  user: null,
  setUser: (user) => set({ user }),
  favorites: null,
  setFavorites: (favorites) => set({ favorites }),
  addFavorites: (newFavorite) =>
    set((state) => ({
      favorites: state.favorites
        ? [...state.favorites, newFavorite]
        : [newFavorite],
    })),
  removeFavorites: (locationName, owner) =>
    set((state) => ({
      favorites: state.favorites?.filter(
        (favorite) =>
          favorite.owner !== owner || favorite.locationName !== locationName
      ),
    })),
}));
