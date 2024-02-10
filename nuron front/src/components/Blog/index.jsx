import React from "react";
import BlogCard from "../BlogCard";
import './index.scss'
function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <div className="blogs">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
        <div className="pagination"></div>
      </div>
    </section>
  );
}

export default Blog;
