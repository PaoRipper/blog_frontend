import React, { useState, useContext } from "react";
import CustomInput from "@/components/Layout/CustomInput";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { register } from "@/api/blogApi";
import { useAlert } from "react-alert";
import { LoginContext } from "@/context/LoginContext";
import { useTimeout } from "@/hooks/useTimeout";
import { useRouter } from "next/router";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const alert = useAlert();
  const router = useRouter();
  const { login, user } = useContext(LoginContext);
  const { delayCallback } = useTimeout(3);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [e?.target.name]: e?.target.value,
      };
    });
  };

  const handleSubmit = () => {
    register(
      formValues.username,
      formValues.email,
      formValues.password,
      "default"
    )
      .then((res) => {
        alert.success("Sign up successfully!");
        delayCallback(() => {
          login(formValues.email, formValues.password, "default");
          if (user) {
            router.push("/");
          }
        });
      })
      .catch((e) => {
        alert.error("Something went wrong");
      });
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
