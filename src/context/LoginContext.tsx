import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { getLogin, googleLogin } from "@/api/blogApi";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";

type TUser = {
  auth: boolean;
  token: string;
  username: string;
};

type TContext = {
  login: (email: string, password: string, type: string) => any;
  logout: () => any;
  isLogin: boolean;
  user: TUser;
  setUser: Dispatch<SetStateAction<TUser>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export const LoginContext = createContext<TContext>({
  login: (): any => null,
  logout: (): any => null,
  isLogin: false,
  setUser: () => {},
  user: { auth: false, token: "", username: "" },
  setIsLogin: () => {},
});

export const LoginContextProvider = (props: { children: any }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<TUser>({
    auth: false,
    token: "",
    username: "",
  });
  const [cookies, setCookies, removeCookie] = useCookies();

  const login = (email: string, password: string, type: string) => {
    getLogin(email, password, type).then((res) => {
      setUser(res);
      res.auth && setIsLogin(res.auth);
      typeof window !== "undefined" &&
        window.localStorage.setItem("LOGIN_TOKEN", res.token);
    });
  };

  const logout = () => {
    setUser({ auth: false, token: "", username: "" });
    setIsLogin(false);
    removeCookie("connect.sid");
    !user.auth && setIsLogin(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("LOGIN_TOKEN")
      window.localStorage.removeItem("isLogin")
      if (cookies["connect.sid"]) {
        removeCookie("connect.sid")
      }
    }
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
        setIsLogin(true);
      }
    }
  }, []);


  useEffect(() => {
    const sessionId = cookies["connect.sid"];
    if (sessionId) {
      googleLogin().then((res) => {
        const { auth, username, connect_sid } = res.data;
        setUser({ auth, token: connect_sid, username });
        setIsLogin(true)
        window && window.localStorage.setItem("isLogin", "true");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoginContext.Provider
      value={{ login, logout, isLogin, setUser, user, setIsLogin }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
