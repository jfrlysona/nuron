import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider";
import "./index.scss";
function Footer() {
  const { handleTheme, theme } = useContext(ThemeContext);

  return (
    <footer>
      <div className="container">
        <div className="content">
          <div className="container-content">
            <div className="image">
              <img
                src={
                  theme === "dark"
                    ? "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/logo-white.png"
                    : "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/logo-dark.png"
                }
                alt="Logo"
              />
            </div>
            <div className="resources"></div>
            <div className="marketplace"></div>
            <div className="soldOut"></div>
          </div>
          <div className="footer">
            <div className="container-footer">
              <div className="text">
                <p>©2024 Nuron, Inc. All rights reserved</p>
                <div className="links">
                  <Link to={"/terms"}>Terms</Link>
                  <Link to={"/privacy-policy"}>Privacy Policy</Link>
                </div>
              </div>
              <div className="media">
                <Link to={"https://www.facebook.com/"}>
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
                <Link to={"https://twitter.com/"}>
                  <i className="fa-brands fa-twitter"></i>
                </Link>
                <Link to="https://www.linkedin.com/">
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>
                <Link to="https://www.instagram.com/">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
                <Link to={"https://dribbble.com/"}>
                  <i className="fa-brands fa-dribbble"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
