import { LoginContext } from "@/context/LoginContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";

const Login = () => {
  const { login, logout, user } = useContext(LoginContext);
  const isLogin = useMemo(() => user.auth, [user]);
  const router = useRouter();

  useEffect(() => {
    isLogin && router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => login("Paoripper01@gmail.com", "Ripper217569")}
      >
        Login
      </button>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
      {isLogin ? (
        <h1 className="text-primary fw-bold">You are logged in!</h1>
      ) : (
        <h1 className="text-danger fw-bold">You are not logged in!</h1>
      )}
    </div>
  );
};

export default Login;
