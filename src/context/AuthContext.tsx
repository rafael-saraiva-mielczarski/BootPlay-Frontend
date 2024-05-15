import { UserModel } from "@/models/UserModel";
import { user_api } from "@/services/apiService";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface AuthContextModel extends UserModel {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<string | void>;
  updateUser: (
    id?: number,
    name?: string,
    email?: string,
    password?: string
  ) => Promise<string | void>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<UserModel>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data: UserModel = JSON.parse(
      localStorage.getItem("@Auth.Data") || "{}"
    );
    if (data.id) {
      setIsAuthenticated(true);
      setUserData(data);
    }
    Logout();
  }, []);

  const SignUp = useCallback(
    async (name: string, email: string, password: string) => {
      const respAuth = await user_api.post("/users/create", {
        name,
        email,
        password,
      });

      if (respAuth instanceof Error) {
        return respAuth.message;
      } else {
        console.log(respAuth.data);
        navigate("/login");
      }
    },
    []
  );

  const Login = useCallback(
    async (email: string, password: string) => {
      const respAuth = await user_api.post("/users/auth", {
        email,
        password,
      });

      localStorage.setItem("@Password", password);

      if (respAuth instanceof Error) {
        return respAuth.message;
      }

      localStorage.setItem("@UserToken", respAuth.data.token);
      user_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
      const usersRes = await user_api.get(`/users/`);
      const user = usersRes.data.find((user: UserModel) => user.email == email);

      if (user instanceof Error) {
        return user.message;
      } else {
        setUserData(user);
        setIsAuthenticated(true);
        localStorage.setItem("@Auth.Data", JSON.stringify(user));
        navigate("/dashboard");
      }
    },
    [navigate]
  );

  const UpdateUser = useCallback(
    async (id?: number, name?: string, email?: string, password?: string) => {
      try {
        const userToken = localStorage.getItem("@UserToken");
        user_api.defaults.headers.common.Authorization = `Basic ${userToken}`;
        const resp = await user_api.put("/users/update", {
          id,
          name,
          email,
          password,
        });

        if (resp instanceof Error) {
          return resp.message;
        } else {
          const updatedUserData = {
            id: resp.data.id,
            name: resp.data.name,
            email: resp.data.email,
            password: resp.data.password,
          };

          setUserData(updatedUserData);
          console.log(userData);
          localStorage.setItem("@Auth.Data", JSON.stringify(updatedUserData));
          console.log("Dados atualizados");
        }
      } catch (error) {
        console.error("Erro ao atualizar dados do usuário:", error);
        return "Erro ao atualizar dados do usuário.";
      }
    },
    []
  );

  const Logout = useCallback(() => {
    localStorage.removeItem("@Auth.Data");
    localStorage.removeItem("@UserToken");
    setUserData(undefined);
    setIsAuthenticated(false);
    return <Navigate to="/" />;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        ...userData,
        login: Login,
        signUp: SignUp,
        logout: Logout,
        updateUser: UpdateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
