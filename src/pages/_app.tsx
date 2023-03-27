import type { AppProps } from "next/app";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";

import "../../public/assets/css/Card.css"
import "../../public/assets/css/Layout.css"
import "../../public/assets/css/Navbar.css"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <Component {...pageProps} />;
}
