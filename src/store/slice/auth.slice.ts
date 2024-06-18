import { StateCreator } from "zustand";

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
  company: null,
  loading: true,
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  // For logging out user
  userSignOut: () => {
    /* const loggedInUser: ILoggedInUsersCollection | null = storage.getJson(
      LocalStorageKey.LOGGEDIN_USER
    );

    if (loggedInUser) {
      set((state) => ({
        ...state,
        admin: null,
        company: null,
        client: null,
        superAdmin: null,
      }));
      DbCompany.deleteUserLoggedInDoc(loggedInUser.LoggedInId)
        .then(() => {
          storage.clear(LocalStorageKey.LOGGEDIN_USER);
        })
        .catch((error) => {
          console.log(error);
        });
    } */
  },
});
