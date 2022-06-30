import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  type: number;
}

interface AuthState {
  user: User;
}

interface ISignIn {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: User;
  updateContext: (user: User) => void;
  signIn: (data: ISignIn) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within as AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@WebMasters:token");
    const user = localStorage.getItem("@WebMasters:user");

    if (user && token) {
      return {
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const updateContext = useCallback((user: User) => {
    setData({
      user,
    });
  }, []);

  const signIn = useCallback(
    async ({ email, password }: ISignIn) => {
      api
        .post("/sessions", {
          email,
          password,
        })
        .then((response) => {
          const { user, token } = response.data;

          localStorage.setItem("@WebMasters:user", JSON.stringify(user));
          localStorage.setItem("@WebMasters:token", token);
          api.defaults.headers.common["authorization"] = `Bearer ${token}`;
          updateContext(user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [updateContext]
  );

  const signOut = useCallback(() => {
    setData({} as AuthState);
    localStorage.clear();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        updateContext,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
