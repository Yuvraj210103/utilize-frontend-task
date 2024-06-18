import { StateCreator } from "zustand";
import * as storage from "../../utilities/Storage";
import { LocalStorageKey } from "../../@types/enum";
import { googleLogout } from "@react-oauth/google";

export interface IAuthUser {
  name: string;
  picture: string;
  email: string;
}

interface AuthState {
  authUser: IAuthUser | null;
  setAuthUser: (data: IAuthUser | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userSignOut: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  authUser: null,
  setAuthUser: (authUser) => set((state) => ({ ...state, authUser })),
  loading: true,
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  // For logging out user
  userSignOut: () => {
    const loggedInUser: IAuthUser | null = storage.getJson(
      LocalStorageKey.LOGGEDIN_USER
    );

    if (loggedInUser) {
      set((state) => ({
        ...state,
        authUser: null,
      }));

      localStorage.removeItem(LocalStorageKey.LOGGEDIN_TOKEN);
      localStorage.removeItem(LocalStorageKey.LOGGEDIN_USER);
      googleLogout();
    }
  },
});
