import type { AppProps } from "next/app";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

import "bootstrap/dist/css/bootstrap.css";

import "/public/assets/css/Card.css";
import "/public/assets/css/Layout.css";
import "/public/assets/css/Navbar.css";
import "/public/assets/css/Signup.css";
import "/public/assets/css/Profile.css";
import "/public/assets/css/Create.css";
import "/public/assets/css/Snow.css";
import "/public/assets/css/Comment.css";



import { LoginContextProvider } from "@/context/LoginContext";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

export default function App({ Component, pageProps }: AppProps) {
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.FADE,
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <AlertProvider template={AlertTemplate as any} {...options}>
      <LoginContextProvider>
        <Navbar />
        <Component {...pageProps} />;
      </LoginContextProvider>
    </AlertProvider>
  );
}
