import React from "react";
import "./index.scss";
function NftCard({ img, name, price, likes }) {
  return (
    <div id="nft-card">
      <div className="hover-btns">
        <div className="icon">
          <i className="fa-light fa-heart"></i>
        </div>
        <div className="icon">
          <i className="fa-light fa-cart-shopping"></i>
        </div>
      </div>
      <div className="image">
        <img src={img} alt="" />
      </div>
      <div className="content">
        <div className="header">
          <span>Name</span>
          <i className="fa-regular fa-ellipsis"></i>
        </div>
        <p>{name}</p>
        <div className="footer">
          <div className="price">
            <p> Starting bid:</p>
            <span>${price.toFixed(2)}</span>
          </div>
          <div className="likes">
            <i className="fa-light fa-thumbs-up"></i>
            <span>{likes && likes.length}</span>
          </div>
        </div>
        <button>Bid now</button>
      </div>
    </div>
  );
}

export default NftCard;
