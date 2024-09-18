import { create } from "zustand";
import { User } from "@/lib/types/user";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setToken: (token) => set({ token }),
        logout: () => set({ user: null, token: null, isAuthenticated: false }),
      }),
      {
        name: "user-storage",
        getStorage: () => ({
          getItem: (name: string) => {
            if (typeof window !== 'undefined') {
              return window.localStorage.getItem(name);
            }
            return null;
          },
          setItem: (name: string, value: string) => {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem(name, value);
            }
          },
          removeItem: (name: string) => {
            if (typeof window !== 'undefined') {
              window.localStorage.removeItem(name);
            }
          },
        }),
      }
    ),
    { name: "UserStore" }
  )
);