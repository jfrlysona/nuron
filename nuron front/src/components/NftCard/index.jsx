import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { UserContext } from "../../context/UserProvider";
import { WishlistContext } from "../../context/WIshlistProvider";
import { LikeContext } from "../../context/LikeProvider";
function NftCard({
  img,
  name,
  price,
  likes,
  id,
  collection,
  created,
  endingOn,
  collectionId,
}) {
  const navigate = useNavigate();
  const { decode } = useContext(UserContext);
  const { wishlist, addWishlist, removeItemWishlist } =
    useContext(WishlistContext);
  const { likeNft, checkIfUserLikedNft } = useContext(LikeContext);
  const isLikedByUser = checkIfUserLikedNft(id);
  return (
    <>
      <div id="nft-card">
        <div className="hover-btns">
          <div className="icon">
            {wishlist.includes(id) ? (
              <i
                className="fa-solid fa-heart"
                style={{ color: "#00a3ff" }}
                onClick={() => removeItemWishlist(id)}
              ></i>
            ) : (
              <i
                className="fa-light fa-heart"
                onClick={() => addWishlist(id)}
              ></i>
            )}
          </div>
          <div className="icon">
            <i className="fa-light fa-cart-shopping"></i>
          </div>
        </div>
        <div className="image" onClick={()=>navigate("/nft/"+id)}>
          <img src={img} alt="nft image" />
        </div>
        <div className="content">
          <Link to={"/collection/" + collectionId} className="collection">
            {collection}
          </Link>
          <Link to={"/nft/" + id} className="name-nft">
            {name}
          </Link>
          <div className="footer">
            <div className="price">
              <p> Starting bid:</p>
              <span>${price && price.toFixed(2)}</span>
            </div>
            <div className="likes">
              {isLikedByUser ? (
                <i
                  className="fa-solid fa-thumbs-up"
                  style={{ color: "#00a3ff" }}
                  onClick={() => {
                    decode ? likeNft(id) : navigate("/login");
                  }}
                ></i>
              ) : (
                <i
                  className="fa-light fa-thumbs-up"
                  onClick={() => {
                    decode ? likeNft(id) : navigate("/login");
                  }}
                ></i>
              )}

              <span>{likes && likes.length}</span>
            </div>
          </div>
          <button onClick={() => navigate("/nft/" + id)}>Bid now</button>
        </div>
      </div>
    </>
  );
}

export default NftCard;
