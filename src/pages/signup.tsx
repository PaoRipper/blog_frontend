import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomInput from "@/components/Layout/CustomInput";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import FacebookIcon from "../../public/assets/icons/facebook.png";
import GoogleIcon from "../../public/assets/icons/google.png";
import { baseURL, googleLogin } from "@/api/blogApi";
import Link from "next/link";
import { GoogleLogin } from "react-google-login";
import { googleClientId } from "@/constants/constants";
import { gapi, gapiComplete } from "gapi-script";
import axios from "axios";

const SignUp = () => {

  return (
    <div className="signup">
      <h2 className="sign-up-text">Sign Up</h2>
      <CustomInput
        icon={faUser}
        placeholder="Type your username"
        name="username"
        type="text"
        className="custom-input"
      />
      <CustomInput
        icon={faLock}
        placeholder="Type your password"
        name="password"
        type="password"
        className="custom-input"
      />
      <span className="forgot-password">Forgot password?</span>
      <button className="btn btn-lg signup-btn">Sign up</button>
      <div className="social-sign">
        <h6 className="social-sign-text">Or sign Up using</h6>
        <Image src={FacebookIcon} alt="facebook-icon" className="social-icon" />
        <Link href={`${baseURL}/auth/google`}>
          <Image src={GoogleIcon} alt="google-icon" className="social-icon" />
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
