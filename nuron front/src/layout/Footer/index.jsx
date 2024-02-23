import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider";
import "./index.scss";
import { useState } from "react";
function Footer() {
  const { handleTheme, theme } = useContext(ThemeContext);
  const [nft, setNft] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/nft")
      .then((res) => res.json())
      .then((data) => setNft(data.slice(0, 3)));
  }, []);
  return (
    <footer>
      <div className="container">
        <div className="content">
          <div className="container-content">
            <div className="updates">
              <div className="image">
                <img
                  src={
                    theme === "dark"
                      ? "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/logo-white.png"
                      : "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/logo-dark.png"
                  }
                  alt="Logo"
                />
                <p>
                  Created with the collaboration of over 60 of <br /> the world's best
                  Nuron Artists.
                </p>
              </div>
              <div className="email">
                <p>Get The Latest Nuron Updates</p>
                <div className="inp">
                  <input type="text" placeholder="Your email address"/>
                  <button>Subscribe</button>
                </div>
                  <span>Email is safe. We don't spam.</span>
              </div>
            </div>

            <div className="resources">
              <h3>Resources</h3>
              <div className="links">
                <Link to={"#"}>Protocol Explore</Link>
                <Link to={"#"}>System Token</Link>
                <Link to={"#"}>Otimize Time</Link>
                <Link to={"#"}>Visual Checking</Link>
                <Link to={"#"}>Fadeup System</Link>
                <Link to={"#"}>Activity Log</Link>
                <Link to={"#"}>System Auto Since</Link>
                <Link to={"#"}>Platform status</Link>
              </div>
            </div>
            <div className="marketplace">
              <h3>Marketplace</h3>
              <div className="links">
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/blog">Key Features</Link>
                <Link to="/shop">NFT</Link>
                <Link to="/collections">Our Collections</Link>
                <Link to="/about">Services</Link>
                <Link to="/sign-up">Vendor Registration</Link>
                <Link to="/login">Careers</Link>
              </div>
            </div>
            <div className="soldOut">
              <h3>Recent Sold Out</h3>
              {nft.map((x) => (
                <div className="nft-footer">
                  <img src={x.image} alt="" />
                  <div className="info">
                    <Link to={"/nft/"+x._id}>{x.name}</Link>
                    <span>${x.price && x.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
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
