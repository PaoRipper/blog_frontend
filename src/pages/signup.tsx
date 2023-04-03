import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomInput from "@/components/Layout/CustomInput";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import FacebookIcon from "../../public/assets/icons/facebook.png";
import GoogleIcon from "../../public/assets/icons/google.png";
import { googleLogin, register } from "@/api/blogApi";
import Link from "next/link";
import { GoogleLogin } from "react-google-login";
import { googleClientId } from "@/constants/constants";
import { gapi, gapiComplete } from "gapi-script";
import axios from "axios";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: "",
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
    register(formValues.username, formValues.email, formValues.password, "default")
  };

  return (
    <div className="signup">
      <h2 className="sign-up-text">Sign Up</h2>
      <CustomInput
        icon={faUser}
        placeholder="Type your username"
        name="username"
        type="text"
        className="custom-input"
        onChange={handleChange}
      />
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
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
