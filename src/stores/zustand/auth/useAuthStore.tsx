import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type TAuthStore = {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<TAuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));
