import type { AppProps } from "next/app";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

import "bootstrap/dist/css/bootstrap.css";

import "../../public/assets/css/card.css";
import "../../public/assets/css/layout.css";
import "../../public/assets/css/navbar.css";
import "../../public/assets/css/signup.css";
import "../../public/assets/css/profile.css";
import "../../public/assets/css/create.css";

import { LoginContextProvider } from "@/context/LoginContext";
import { render } from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

export default function App({ Component, pageProps }: AppProps) {
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <AlertProvider template={AlertTemplate as any}{...options}>
      <LoginContextProvider>
        <Navbar />
        <Component {...pageProps} />;
      </LoginContextProvider>
    </AlertProvider>
  );
}
