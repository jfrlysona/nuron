import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { UserContext } from "../../context/UserProvider";
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
  const { decode, token, user, setUser } = useContext(UserContext);
  const [nft, setNft] = useState({});
  const [like, setLike] = useState(false);
  const [likedByUser, setLikedByUser] = useState(false);

  const likeNft = async () => {
    try {
      let updatedLikes = [...likes];
      let newLikeStatus = !like;

      if (newLikeStatus) {
        updatedLikes.push(decode.userId);
      } else {
        updatedLikes = updatedLikes.filter(
          (userId) => userId !== decode.userId
        );
      }

      const response = await fetch("http://localhost:3000/nft/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          likes: updatedLikes,
        }),
      });

      const data = await response.json();
      setNft(data);
      setLike(newLikeStatus);
      if (newLikeStatus) {
        addLikeToUser();
      } else {
        removeLikeFromUser();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  async function addLikeToUser() {
    const likedNfts = user.likedNfts || [];
    try {
      const response = await fetch(
        "http://localhost:3000/user/" + decode.userId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            likedNfts: [...likedNfts, id],
          }),
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function removeLikeFromUser() {
    const likedNfts = user.likedNfts || [];
    try {
      const response = await fetch(
        "http://localhost:3000/user/" + decode.userId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            likedNfts: likedNfts.filter((nftId) => nftId !== id),
          }),
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    if (user && user?.likedNfts && user?.likedNfts.includes(id)) {
      setLikedByUser(true);
    } else {
      setLikedByUser(false);
    }
  }, [user, id]);

  async function addWishlist() {
    const wishlist = user.wishlist || [];
    try {
      const response = await fetch(
        "http://localhost:3000/user/" + decode.userId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            wishlist: [...wishlist, id],
          }),
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function removeItemWishlist(itemId) {
    const wishlist = user.wishlist || [];
    try {
      const response = await fetch(
        "http://localhost:3000/user/" + decode.userId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            wishlist: wishlist.filter((nftId) => nftId !== id),
          }),
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div id="nft-card">
        <div className="hover-btns">
          <div className="icon">
            { user.wishlist.includes(id) ? (
              <i
                className="fa-solid fa-heart"
                onClick={() => removeItemWishlist()}
              ></i>
            ) : (
              <i
                className="fa-light fa-heart"
                onClick={() => addWishlist()}
              ></i>
            )}
          </div>
          <div className="icon">
            <i className="fa-light fa-cart-shopping"></i>
          </div>
        </div>
        <div className="image">
          <img src={img} alt="" />
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
              {likedByUser ? (
                <i
                  className="fa-solid fa-thumbs-up"
                  onClick={() => {
                    decode ? likeNft() : navigate("/login");
                  }}
                ></i>
              ) : (
                <i
                  className="fa-light fa-thumbs-up"
                  onClick={() => {
                    decode ? likeNft() : navigate("/login");
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
