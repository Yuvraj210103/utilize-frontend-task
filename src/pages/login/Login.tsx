import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useState } from "react";
import { useAuthState } from "../../store";
import { IAuthUser } from "../../store/slice/auth.slice";
import { LocalStorageKey } from "../../@types/enum";

const Login = () => {
  const [error, setError] = useState<string | null>(null);

  const { setAuthUser } = useAuthState();

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (credential) {
      const user = JSON.parse(atob(credential?.split(".")[1]));

      // Save to local storage
      localStorage.setItem(LocalStorageKey.LOGGEDIN_TOKEN, credential);
      localStorage.setItem(LocalStorageKey.LOGGEDIN_USER, JSON.stringify(user));

      setAuthUser(user as IAuthUser);
    }
  };

  const handleLoginFailure = () => {
    setError("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="431451058290-jvgiebi4v0edprgeg8f3l4lte8pl0jvt.apps.googleusercontent.com">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
          <div className="text-center text-2xl font-bold">Login</div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
