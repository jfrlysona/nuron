import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../BlogCard";
import "./index.scss";
function OurRecentBlog() {
  return (
    <div id="ourRecentBlog">
      <div className="container">
        <div className="title">
          <h1>Our Recent Blog</h1>
          <Link to="/blog">
            view all <i className="fa-light fa-arrow-right"></i>
          </Link>
        </div>
        <div className="blog-cards">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
}

export default OurRecentBlog;
