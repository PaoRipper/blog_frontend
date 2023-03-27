import Link from "next/link";
import React from "react";

// import BrandLogo from "../public/assets/logo/brand-logo.svg";

const Header = () => {
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
      title: "Sign up",
      url: "/signup"
    },
    {
      title: "Login",
      url: "/login"
    }
  ];

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
            {Menus.map((item, index) => (
              <li className="nav-item" key={index}>
                <a href={item.url} className="nav-link">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
