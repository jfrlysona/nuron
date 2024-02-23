import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider";
import { UserContext } from "../../context/UserProvider";
import "./index.scss";
import { CartContext } from "../../context/CartProvider";
import { SearchContext } from "../../context/SearchProvider";
import SearchResult from "../../components/SearchResult";
import MenuBar from "../../components/MenuBar";
function Navbar() {
  const { handleTheme, theme } = useContext(ThemeContext);
  const { cart } = useContext(CartContext);
  const { searchQuery, setSearchQuery, search } = useContext(SearchContext);
  const { decode, user, logout } = useContext(UserContext);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
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
  const handleSearch = () => {
    const { filteredUsers, filteredNFTs, filteredCollections } = search();
    setShowSearchResult(!showSearchResult);
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
            <NavLink to={"/shop"}>Shop</NavLink>
            <NavLink to={"/create-variants"}>Create</NavLink>
            <NavLink to={"/collections"}>Collection</NavLink>
            <NavLink to={"/blog"}>Blog</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
          </div>
        </div>
        <div className="end">
          <div className="input">
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i
              className="fa-sharp fa-light fa-magnifying-glass"
              onClick={handleSearch}
            ></i>
          </div>
          {showSearchResult && (
            <div style={{ position: "relative" }}>
              <SearchResult />
            </div>
          )}
          {decode ? (
            <Link to={"/my-profile"}> {user.firstName} </Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
          {decode && decode.role === "Admin" ? (
            <Link to={"/admin-panel"}>
              <i className="fa-light fa-circle-user"></i>
            </Link>
          ) : null}
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
            <div className="icon" onClick={() => navigate("/wishlist")}>
              <i className="fa-light fa-heart"></i>
            </div>
            <div className="icon cart-i" onClick={() => navigate("/cart")}>
              <i className="fa-light fa-cart-shopping">
                <sup>{cart.length ? cart.length : ""}</sup>
              </i>
            </div>
            <div className="icon menu" onClick={() => setOpenMenu(!openMenu)}>
              <i className="fa-light fa-bars"></i>
            </div>
          </div>
        </div>
        {openMenu && <MenuBar close={()=>setOpenMenu(false)} />}
      </div>
    </nav>
  );
}

export default Navbar;
