import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import "./index.scss";
import { Link, NavLink } from "react-router-dom";
function Navbar() {
  const { handleTheme, theme } = useContext(ThemeContext);
  const [stickyNav, setStickyNav] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 480 ? setStickyNav(true) : setStickyNav(false);
    }
  };

  return (
    <nav className={`${stickyNav ? "fixed" : ""} `}>
      <div className="navbar">
        <div className="start">
          <div className="logo">
            <img
              src={
                theme === "dark"
                  ? "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/logo-white.png"
                  : "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/logo-dark.png"
              }
              alt="Logo"
            />
          </div>
          <div className="pages">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/about"}>About</NavLink>
            <NavLink to={"/*"}>Explore</NavLink>
            <NavLink to={"/*"}>Pages</NavLink>
            <NavLink to={"/*"}>Blog</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
          </div>
        </div>
        <div className="end">
          <div className="input">
            <input type="text" placeholder="Search here" />
            <i className="fa-sharp fa-light fa-magnifying-glass"></i>
          </div>
          <Link to={"/login"}>Login</Link>
          <div className="icons">
            <div className="icon" onClick={handleTheme}>
              {theme === "dark" ? (
                <i className="fa-light fa-sun-bright"></i>
              ) : (
                <i className="fa-light fa-moon"></i>
              )}
            </div>
            <div className="icon">
              <i className="fa-light fa-cart-shopping"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
