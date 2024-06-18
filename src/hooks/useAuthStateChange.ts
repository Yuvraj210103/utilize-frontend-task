import { useEffect } from "react";
import { LocalStorageKey } from "../@types/enum";
import { useAuthState } from "../store";
import { IAuthUser } from "../store/slice/auth.slice";
import * as storage from "../utilities/Storage";

const useAuthStateChange = () => {
  const { setAuthUser } = useAuthState();
  useEffect(() => {
    const loggedInUser = storage.getJson<IAuthUser>(
      LocalStorageKey.LOGGEDIN_USER
    );

    if (loggedInUser) {
      setAuthUser(loggedInUser);
    }
  }, []);
};

export default useAuthStateChange;
