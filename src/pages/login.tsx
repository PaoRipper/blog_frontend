import CustomInput from "@/components/Layout/CustomInput";
import { LoginContext } from "@/context/LoginContext";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import FacebookIcon from "../../public/assets/icons/facebook.png";
import GoogleIcon from "../../public/assets/icons/google.png";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { baseURL, getLogin, googleLogin } from "@/api/blogApi";
import { useAlert } from "react-alert";

const Login = () => {
  const { login, logout, setUser, user, setIsLogin } = useContext(LoginContext);
  const alert = useAlert();
  const isLogin = useMemo(() => user.auth, [user]);
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [e?.target.name]: e?.target.value,
      };
    });
  };

  const handleSubmit = () => {
    login(formValues.email, formValues.password, "default");
  };

  const handleGoogleLogin = () => {
    if (window) {
      window.open(`${baseURL}/auth/google`, "_self");
    }
  };

  useEffect(() => {
    isLogin && alert.show("Logged in!");
    setTimeout(() => {
      isLogin && router.push("/");
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <div className="signup">
      <h2 className="sign-up-text">Login</h2>
      <CustomInput
        icon={faUser}
        placeholder="Type your email"
        name="email"
        type="text"
        className="custom-input"
        onChange={handleChange}
      />
      <CustomInput
        icon={faLock}
        placeholder="Type your password"
        name="password"
        type="password"
        className="custom-input"
        onChange={handleChange}
      />
      <span className="forgot-password">Forgot password?</span>
      <button className="btn btn-lg signup-btn" onClick={handleSubmit}>
        Login
      </button>
      <div className="social-sign">
        <h6 className="social-sign-text">Or login using</h6>
        <Link href="#" onClick={handleGoogleLogin}>
          <Image src={GoogleIcon} alt="google-icon" className="social-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
