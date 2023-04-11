import React, { useState, useContext, useEffect, useMemo } from "react";
import CustomInput from "@/components/Layout/CustomInput";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { register } from "@/api/blogApi";
import { useAlert } from "react-alert";
import { LoginContext } from "@/context/LoginContext";
import { useTimeout } from "@/hooks/useTimeout";
import { useRouter } from "next/router";

type TSignUp = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

const SignUp = () => {
  const [formValues, setFormValues] = useState<TSignUp>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errorText, setErrorText] = useState({
    email: "",
    password: "",
  });
  const error = useMemo(() => {
    if (errorText.email.length === 0 && errorText.password.length === 0) {
      return false;
    }
    return true;
  }, [errorText]);
  const alert = useAlert();
  const router = useRouter();
  const { login, user } = useContext(LoginContext);
  const { delayCallback } = useTimeout(3);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventTarget = e?.target;
    if (eventTarget.name === "email") {
      if (eventTarget.validity.valid) {
        setErrorText((prev) => ({
          ...prev,
          email: "",
        }));
      } else {
        setErrorText((prev) => ({
          ...prev,
          email: "Email must be in form of email",
        }));
      }
    }
    setFormValues((prev) => ({
      ...prev,
      [e?.target.name]: e?.target.value,
    }));
  };

  const handleSubmit = () => {
    register(
      formValues.username,
      formValues.email,
      formValues.password,
      "default"
    )
      .then(() => {
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

  useEffect(() => {
    if (formValues.password !== formValues.password2) {
      setErrorText((prev) => ({
        ...prev,
        password: "Password and confirm password need to match",
      }));
    } else {
      setErrorText((prev) => ({
        ...prev,
        password: "",
      }));
    }
  }, [formValues]);

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
        type="email"
        className="custom-input"
        onChange={handleChange}
      />
      <span className="signup-error">{errorText?.email}</span>
      <CustomInput
        icon={faLock}
        placeholder="Type your password"
        name="password"
        type="password"
        className="custom-input"
        onChange={handleChange}
      />
      <CustomInput
        icon={faLock}
        placeholder="Type your password"
        label="Confirm password"
        name="password2"
        type="password"
        className="custom-input"
        onChange={handleChange}
      />
      <span className="signup-error">{errorText?.password}</span>
      <span className="forgot-password">Forgot password?</span>
      <button
        className={`btn btn-lg btn-lg signup-btn ${error ? "disabled" : ""}`}
        disabled={error}
        onClick={handleSubmit}
      >
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
