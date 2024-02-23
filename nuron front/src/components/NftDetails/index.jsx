import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WishlistContext } from "../../context/WIshlistProvider";
import { LikeContext } from "../../context/LikeProvider";
import { UserContext } from "../../context/UserProvider";
import RelatedItems from "../RelatedItems";
import { CartContext } from "../../context/CartProvider";
function NftDetails() {
  const { id } = useParams();
  const [nft, setNft] = useState({});
  const [allNfts, setAllNfts] = useState([]);
  const [user, setUser] = useState([]);
  const [collection, setCollection] = useState([]);
  const [openBids, setOpenBids] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);
  const [bid, setBid] = useState(0);
  const { decode, token } = useContext(UserContext);
  const { cart, addCart, increaseCount, decreaseCount, isCart } =
    useContext(CartContext);
  const { wishlist, addWishlist, removeItemWishlist } =
    useContext(WishlistContext);
  const { likeNft, checkIfUserLikedNft } = useContext(LikeContext);
  const navigate = useNavigate();
  const isLikedByUser = checkIfUserLikedNft(id);

  useEffect(() => {
    fetch("http://localhost:3000/nft/" + id)
      .then((res) => res.json())
      .then((data) => setNft(data));
  }, [id]);
  useEffect(() => {
    fetch("http://localhost:3000/nft/")
      .then((res) => res.json())
      .then((data) => setAllNfts(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/collection/")
      .then((res) => res.json())
      .then((data) => setCollection(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/user/")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  function getRelatedItems() {
    if (nft.collectionId) {
      const relatedItems = allNfts.filter(
        (item) => item.collectionId === nft.collectionId && item._id !== id
      );
      return relatedItems;
    }
    return [];
  }
  function placeBid(e) {
    e.preventDefault();
    fetch("http://localhost:3000/nft/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bidPrice: bid,
        bidBy: decode.userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => setNft(data));
  }

  const tagsArray = nft.tags && nft.tags.split(",").map((tag) => tag.trim());
  const highestBid =
    nft.bids && Math.max(...nft.bids.map((bid) => bid.bidPrice));
  return (
    <section id="nftDetails">
      <div className="container">
        <div className="details">
          <div className="image">
            <img src={nft.image} alt="" />
          </div>
          <div className="content">
            <div className="title">
              <h1>{nft.name}</h1>
              <div className="icons">
                <div className="icon">
                  {isLikedByUser ? (
                    <i
                      className="fa-solid fa-thumbs-up"
                      style={{ color: "var(--btn-selected-color3)" }}
                      onClick={() => {
                        decode ? likeNft(nft._id) : navigate("/login");
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-light fa-thumbs-up"
                      onClick={() => {
                        decode ? likeNft(nft._id) : navigate("/login");
                      }}
                    ></i>
                  )}

                  <span>{nft.likes && nft.likes.length}</span>
                </div>
                <div className="icon">
                  {decode ? (
                    wishlist.includes(id) ? (
                      <i
                        className="fa-solid fa-heart"
                        style={{ color: "var(--btn-selected-color3)" }}
                        onClick={() => removeItemWishlist(id)}
                      ></i>
                    ) : (
                      <i
                        className="fa-light fa-heart"
                        onClick={() => addWishlist(id)}
                      ></i>
                    )
                  ) : (
                    <i
                      className="fa-light fa-heart"
                      onClick={() => navigate("/login")}
                    ></i>
                  )}
                </div>
                <div className="icon">
                  {isCart(nft) ? (
                    <>
                      <i
                        className="fa-light fa-minus"
                        onClick={() => decreaseCount(nft)}
                      ></i>
                      <span>
                        {
                          cart.find((cartItem) => cartItem._id === nft._id)
                            ?.count
                        }
                      </span>
                      <i
                        className="fa-light fa-plus"
                        onClick={() => increaseCount(nft)}
                      ></i>
                    </>
                  ) : (
                    <i
                      className="fa-light fa-cart-shopping"
                      onClick={() => addCart(nft)}
                    ></i>
                  )}
                </div>
              </div>
            </div>
            <div className="price">
              <p>
                Starting bid <span>${nft.price && nft.price.toFixed(2)}</span>
              </p>
            </div>
            <div className="made">
              <div className="info">
                <span>Creator</span>
                <div className="author">
                  {user.find((x) => x._id === nft.authorId) && (
                    <img
                      src={
                        user.find((x) => x._id === nft.authorId).profileImage
                      }
                      alt=""
                    />
                  )}
                  {user.find((x) => x._id === nft.authorId) && (
                    <Link to={"/user/" + nft.authorId}>
                      {user.find((x) => x._id === nft.authorId).firstName}{" "}
                      {user.find((x) => x._id === nft.authorId).lastName}
                    </Link>
                  )}
                </div>
              </div>
              <div className="info">
                <span>Collection</span>
                <div className="collection">
                  {collection.find((col) => col._id === nft.collectionId) && (
                    <img
                      src={
                        collection.find((col) => col._id === nft.collectionId)
                          .image
                      }
                      alt=""
                    />
                  )}

                  {collection.find((col) => col._id === nft.collectionId) && (
                    <Link to={"/collection/" + nft.collectionId}>
                      {
                        collection.find((col) => col._id === nft.collectionId)
                          .name
                      }
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="pay">
              <div className="place-bid">
                <input
                  type="number"
                  value={bid}
                  onChange={(e) => setBid(e.target.value)}
                />
                <button
                  onClick={
                    decode
                      ? (e) => {
                          placeBid(e);
                          setBid(0);
                        }
                      : () => navigate("/login")
                  }
                >
                  Place Bid
                </button>
              </div>
              <div className="buy-now" onClick={() => addCart(nft)}>
                <Link to="/cart">Buy Now ${highestBid}</Link>
              </div>
            </div>
            <div className="tabs">
              <button
                style={
                  openBids
                    ? {
                        backgroundColor: "var(--btn-selected-color)",
                        border: "1px solid transparent",
                        color: "white",
                      }
                    : null
                }
                onClick={() => {
                  setOpenBids(true);
                  setOpenDetails(false);
                }}
              >
                Bids
              </button>
              <button
                style={
                  openDetails
                    ? {
                        backgroundColor: "var(--btn-selected-color)",
                        border: "1px solid transparent",
                        color: "white",
                      }
                    : null
                }
                onClick={() => {
                  setOpenBids(false);
                  setOpenDetails(true);
                }}
              >
                Details
              </button>
            </div>
            {openBids && (
              <div className="tab-content bid-tab">
                {nft.bids &&
                  nft.bids.map((x) => (
                    <div className="tab-card" key={x._id}>
                      {user.find((z) => z._id === x.bidBy) && (
                        <img
                          src={user.find((z) => z._id === x.bidBy).profileImage}
                          alt=""
                        />
                      )}
                      <div className="text">
                        {user.find((a) => a._id === x.bidBy) && (
                          <p>
                            <span>${x.bidPrice && x.bidPrice.toFixed(2)} </span>
                            by{" "}
                            <Link to={"/user/" + x.bidBy}>
                              {user.find((a) => a._id === x.bidBy).firstName}{" "}
                              {user.find((a) => a._id === x.bidBy).lastName}
                            </Link>
                          </p>
                        )}
                        <span>
                          {new Date(x.created).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {openDetails && (
              <div className="tab-content">
                <div className="description">
                  <span>Description</span>
                  <p>{nft.description}</p>
                </div>
                <div className="tags">
                  <span>Tags</span>
                  <p>
                    {tagsArray.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </p>
                </div>
                <div className="category">
                  <span>Category</span>
                  <p>{nft.category}</p>
                </div>
                <div className="created">
                  <span>Created </span>
                  <p>
                    {new Date(nft.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="ending">
                  <span>Expires On </span>
                  <p>
                    {new Date(nft.endingOn).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <RelatedItems relatedItems={getRelatedItems()} collection={collection} />
    </section>
  );
}

export default NftDetails;
