import type { AppProps } from "next/app";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

import "bootstrap/dist/css/bootstrap.css";

import "../../public/assets/css/Card.css";
import "../../public/assets/css/Layout.css";
import "../../public/assets/css/Navbar.css";
import "../../public/assets/css/Signup.css";

import { LoginContextProvider } from "@/context/LoginContext";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <LoginContextProvider>
      <Navbar />
      <Component {...pageProps} />;
    </LoginContextProvider>
  );
}
