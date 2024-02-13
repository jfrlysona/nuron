import React from "react";
import "./index.scss";

function BlogCard() {
  return (
    <div className="blog-card">
      <div className="img">
        <img
          src="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2020/04/nuron-blog-image-3-650x433.jpg"
          alt=""
        />
      </div>
      <div className="content">
        <div className="name-time">
          <p>NFT</p>
          <div className="time">
            <i className="fa-light fa-clock"></i>
            <span>3 min read</span>
          </div>
        </div>
        <h4>
          Rare art from the best artists
          <i className="fa-light fa-arrow-up-right"></i>
        </h4>
      </div>
    </div>
  );
}

export default BlogCard;
