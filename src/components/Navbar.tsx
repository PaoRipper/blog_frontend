import { LoginContext } from "@/context/LoginContext";
import Link from "next/link";
import React, { useContext, useMemo } from "react";

// import BrandLogo from "../public/assets/logo/brand-logo.svg";

const Header = () => {
  const { user, logout } = useContext(LoginContext);
  const isLogin = useMemo(() => user.auth, [user]);

  const Menus = [
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Contact",
      url: "/contact",
    },
    {
      title: "Profile",
      url: "/profile",
    },
    {
      title: "Sign up",
      url: "/signup",
    },
    {
      title: "Login",
      url: "/login",
    },
  ];

  const filteredMenus = Menus.filter((menu) => {
    if (isLogin) {
      return menu.title != "Login" && menu.title != "Sign up";
    } else {
      return menu;
    }
  });

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div>
          <Link href="#" className="navbar-brand">
            Bon
          </Link>
          {/* <Image src={BrandLogo} alt="navbar-brand" width={30} /> */}
        </div>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto">
            {filteredMenus.map((item, index) => (
              <li className="nav-item" key={index}>
                <a href={item.url} className="nav-link">
                  {item.title}
                </a>
              </li>
            ))}
            {isLogin ? (
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={logout}>
                  Logout
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
