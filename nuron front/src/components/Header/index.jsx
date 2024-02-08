import React from "react";
import { Link } from "react-router-dom";
import "./index.scss"
function Header({ title, prevLink, currentLink, prevPage, currentPage }) {
  return (
    <div className="header">
      <div className="header-container">
        <h1>{title}</h1>
        <div className="header-links">
          <Link to={prevLink} className="header-link">
            {prevPage}
          </Link>
          <i className="fa-light fa-chevron-right"></i>
          <Link to={currentLink} className="header-link activeLink">
            {currentPage}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
