import React, { useContext, useState } from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import { SearchContext } from "../../context/SearchProvider";
import SearchResult from "../SearchResult";
function MenuBar({ close }) {
  const { searchQuery, setSearchQuery, search } = useContext(SearchContext);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const handleSearch = () => {
    const { filteredUsers, filteredNFTs, filteredCollections } = search();
    setShowSearchResult(!showSearchResult);
  };
  return (
    <div className="MenuBar">
      <div className="content">
        <i className="fa-light fa-xmark-large" onClick={close}></i>
        <h2>Pages</h2>
        <div className="pages">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/shop"}>Shop</NavLink>
          <NavLink to={"/create-variants"}>Create</NavLink>
          <NavLink to={"/collections"}>Collection</NavLink>
          <NavLink to={"/blog"}>Blog</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
        </div>
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
      </div>
    </div>
  );
}

export default MenuBar;
