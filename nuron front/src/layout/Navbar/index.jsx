import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider";
import { UserContext } from "../../context/UserProvider";
import "./index.scss";
function Navbar() {
  const { handleTheme, theme } = useContext(ThemeContext);
  const { decode,user, logout } = useContext(UserContext);
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
      windowHeight > 200 ? setStickyNav(true) : setStickyNav(false);
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
            <NavLink to={"/blog"}>Blog</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
          </div>
        </div>
        <div className="end">
          <div className="input">
            <input type="text" placeholder="Search here" />
            <i className="fa-sharp fa-light fa-magnifying-glass"></i>
          </div>
          {decode ? (
            <Link to={"/my-profile"}> {user.firstName} </Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
          <div className="icons">
            {decode ? (
              <div className="icon">
                <Link to={"/login"} onClick={() => logout()}>
                  <i className="fa-light fa-arrow-right-from-bracket"></i>
                </Link>
              </div>
            ) : null}
            <div className="icon" onClick={handleTheme}>
              {theme === "dark" ? (
                <i className="fa-light fa-sun-bright"></i>
              ) : (
                <i className="fa-light fa-moon"></i>
              )}
            </div>
            <div className="icon">
              <i className="fa-light fa-heart"></i>
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
