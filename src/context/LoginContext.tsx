import { createContext, useEffect, useState } from "react";
import { getLogin } from "@/api/blogApi";
import jwt_decode from "jwt-decode";

type TUser = {
  auth: boolean;
  token: string;
  username: string;
};

type TContext = {
  login: (email: string, password: string) => any;
  logout: () => any;
  isLogin: boolean;
  user: TUser;
};

export const LoginContext = createContext<TContext>({
  login: (): any => null,
  logout: (): any => null,
  isLogin: false,
  user: { auth: false, token: "", username: "" },
});

export const LoginContextProvider = (props: { children: any }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<TUser>({
    auth: false,
    token: "",
    username: "",
  });

  const login = (email: string, password: string) => {
    getLogin(email, password).then((res) => {
      setUser(res);
      res.auth && setIsLogin(res.auth);
      typeof window !== "undefined" && window.localStorage.setItem("LOGIN_TOKEN", res.token);
    });
  };

  const logout = () => {
    setUser({ auth: false, token: "", username: "" });
    !user.auth && setIsLogin(false);
    typeof window !== "undefined" && window.localStorage.setItem("LOGIN_TOKEN", "");
  };

  useEffect(() => {
    if (window) {
      const token = window.localStorage.getItem("LOGIN_TOKEN");
      if (token) {
        const decoded: TUser = jwt_decode(token);
        const { auth, username } = decoded;
        setUser({
          auth,
          token: window!.localStorage!.getItem("LOGIN_TOKEN")!,
          username,
        });
      }
    }
    
  }, []);

  return (
    <LoginContext.Provider value={{ login, logout, isLogin, user }}>
      {props.children}
    </LoginContext.Provider>
  );
};
