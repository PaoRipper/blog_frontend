import { LoginContext } from "@/context/LoginContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useMemo } from "react";

import BrandLogo from "../../public/assets/images/Rubio_Circle.png";

const Header = () => {
  const { user, logout } = useContext(LoginContext);
  const isLogin = useMemo(() => user.auth, [user]);

  const Menus = [
    // {
    //   title: "Profile",
    //   url: "/profile",
    // },
    {
      title: "Sign up",
      url: "/signup",
    },
    {
      title: "Login",
      url: "/login",
    },
    {
      title: "Logout",
      url: "",
      onClick: logout,
    },
  ];

  const filteredMenus = Menus.filter((menu) => {
    if (isLogin) {
      return menu.title != "Login" && menu.title != "Sign up";
    } else {
      return menu.title != "Profile" && menu.title != "Logout";
    }
  });

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div>
          <Link href="/" className="navbar-brand">
            Bon
          </Link>
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
            {isLogin ? (
              <li className="profile-image">
                <Image
                  src={BrandLogo}
                  alt="navbar-brand"
                  width={40}
                  height={40}
                />
              </li>
            ) : null}
            {filteredMenus.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link href={item.url} className="nav-link">
                  {item.onClick ? (
                    <span onClick={item.onClick}>{item.title}</span>
                  ) : (
                    item.title
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
