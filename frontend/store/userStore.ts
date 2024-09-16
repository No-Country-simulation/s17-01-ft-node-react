import { create } from "zustand";
import { User } from "@/lib/types/user";
import { devtools } from "zustand/middleware";
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user,) => {
        set({user});
      }     
    }),
    { name: "UserStore" }
  )
);