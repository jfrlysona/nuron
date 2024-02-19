import React from "react";
import "./index.scss";
function NftCard({ img, name, price, likes }) {
  return (
    <div id="nft-card">
      <div className="image">
        <img src={img} alt="" />
      </div>
      <div className="content">
        <div className="header">
          <span>Name</span>
          <i className="fa-light fa-ellipsis"></i>
        </div>
        <p>{name}</p>
        <div className="footer">
          <div className="price">
            <span> Starting bid:</span>
            <span>${price.toFixed(2)}</span>
          </div>
          <div className="likes">
            <i className="fa-light fa-thumbs-up"></i>
            <span>{likes && likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCard;
