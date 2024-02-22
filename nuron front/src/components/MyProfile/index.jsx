import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import NftCard from "../NftCard";
import CollectionCard from "../CollectionCard";
import PaginationRounded from "../Pagination";
function MyProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openNfts, setOpenNfts] = useState(true);
  const [openCollections, setOpenCollections] = useState(false);
  const [openLiked, setOpenLiked] = useState(false);
  const [nft, setNft] = useState([]);
  const [collection, setCollection] = useState([]);
  const [paginatedUserNfts, setPaginatedUserNfts] = useState([]);
  const [paginatedUserCollections, setPaginatedUserCollections] = useState([]);
  const [nftsPerPage, setNftsPerPage] = useState(10);
  const [collectionsPerPage, setCollectionsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCollections, setCurrentPageCollections] = useState(1);
  useEffect(() => {
    fetch("http://localhost:3000/nft")
      .then((res) => res.json())
      .then((data) => setNft(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/collection")
      .then((res) => res.json())
      .then((data) => setCollection(data));
  }, []);

  function getUserNFTs() {
    const userNFTs = [];
    if (user.collections) {
      user.collections.forEach((collectionId) => {
        const foundCollection = collection.find(
          (col) => col._id === collectionId
        );
        if (foundCollection) {
          foundCollection.nfts.forEach((nftId) => {
            const foundNFT = nft.find((nftItem) => nftItem._id === nftId);
            if (foundNFT) {
              userNFTs.push(foundNFT);
            }
          });
        }
      });
    }
    return userNFTs;
  }

  function getUserCollections() {
    const userCollections = [];
    if (user.collections) {
      user.collections.forEach((collectionId) => {
        const foundCollection = collection.find(
          (col) => col._id === collectionId
        );
        if (foundCollection) {
          userCollections.push(foundCollection);
        }
      });
    }
    return userCollections;
  }

  function getUserLiked() {
    const userLikedNfts = [];
    if (user.likedNfts) {
      user.likedNfts.forEach((nftId) => {
        const foundLiked = nft.find((nftItem) => nftItem._id === nftId);
        if (foundLiked) {
          userLikedNfts.push(foundLiked);
        }
      });
    }
    return userLikedNfts;
  }

  function getCollectionName(nftId) {
    const nftCollectionMap = {};
    collection.forEach((col) => {
      col.nfts.forEach((nftId) => {
        nftCollectionMap[nftId] = col.name;
      });
    });

    return nftCollectionMap[nftId];
  }
  useEffect(() => {
    if (getUserNFTs()) {
      const paginatedData = getUserNFTs().slice(
        (currentPage - 1) * nftsPerPage,
        currentPage * nftsPerPage
      );
      setPaginatedUserNfts(paginatedData);
    }
  }, [currentPage, nftsPerPage, user.collections, collection, nft]);

  useEffect(() => {
    if (getUserCollections()) {
      const paginatedData = getUserCollections().slice(
        (currentPageCollections - 1) * collectionsPerPage,
        currentPageCollections * collectionsPerPage
      );
      setPaginatedUserCollections(paginatedData);
    }
  }, [currentPageCollections, collectionsPerPage, user.collections, collection]);

  let totalPagesNfts = Math.ceil(
    (getUserNFTs() && getUserNFTs().length) / nftsPerPage
  );
  let totalPagesCollections = Math.ceil(
    (getUserCollections() && getUserCollections().length) / collectionsPerPage
  );
  return (
    <section id="MyProfile">
      <div
        className="myProfileHeading"
        style={
          user.bannerImage
            ? { backgroundImage: `url(${user.bannerImage})` }
            : {
                background:
                  "radial-gradient(circle, var(--banner-color) 0%, rgba(148,187,233,1) 100%",
              }
        }
      >
        <div className="content">
          {user.profileImage ? (
            <img src={user.profileImage} alt="avatar" />
          ) : (
            <div className="user-prof-i">
              <i className="fa-solid fa-user"></i>
            </div>
          )}

          <h2>
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="proftext">
          <div className="icons">
            <div className="icon" onClick={() => navigate("/settings")}>
              <i className="fa-light fa-sliders"></i>
              <span>Settings</span>
            </div>
            <div className="icon">
              <i className="fa-light fa-arrow-right-from-bracket"></i>
              <span>Log Out</span>
            </div>
          </div>
          <div className="bio">
            <i className="fa-light fa-thumbtack"></i>
            {
              user.bio?<p>{user.bio}</p>:<p>...</p>
            }
            
          </div>
        </div>
        <div className="tabs">
          <button
            style={
              openNfts
                ? {
                    backgroundColor: "var(--btn-selected-color)",
                    border: "1px solid transparent",
                    color: "white",
                  }
                : null
            }
            onClick={() => {
              setOpenNfts(true);
              setOpenCollections(false);
              setOpenLiked(false);
            }}
          >
            My NFTs
          </button>
          <button
            style={
              openCollections
                ? {
                    backgroundColor: "var(--btn-selected-color)",
                    border: "1px solid transparent",
                    color: "white",
                  }
                : null
            }
            onClick={() => {
              setOpenNfts(false);
              setOpenCollections(true);
              setOpenLiked(false);
            }}
          >
            My Collections
          </button>
          <button
            style={
              openLiked
                ? {
                    backgroundColor: "var(--btn-selected-color)",
                    border: "1px solid transparent",
                    color: "white",
                  }
                : null
            }
            onClick={() => {
              setOpenNfts(false);
              setOpenCollections(false);
              setOpenLiked(true);
            }}
          >
            Liked
          </button>
        </div>
        {openNfts && (
          <div className="tab-content">
            <div className="cards">
              {paginatedUserNfts.length > 0 ? (
                paginatedUserNfts.map((nftItem) => (
                  <div key={nftItem._id}>
                    <NftCard
                      img={nftItem.image}
                      name={nftItem.name}
                      price={nftItem.price}
                      likes={nftItem.likes}
                      id={nftItem._id}
                      collection={getCollectionName(nftItem._id)}
                      created={nftItem.createdAt}
                      ending={nftItem.endingOn}
                      collectionId={nftItem.collectionId}
                      item={nftItem}
                    />
                  </div>
                ))
              ) : (
                <p className="empty-tab">
                  There are no NFTs.
                  <Link to="/create-nft">Create your first NFT now!</Link>
                </p>
              )}
            </div>
            {totalPagesNfts > 1 && (
              <PaginationRounded
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPagesNfts}
              />
            )}
          </div>
        )}
        {openCollections && (
          <div className="tab-content">
            <div className="cards-col">
              {paginatedUserCollections.length > 0 ? (
                paginatedUserCollections.map((myCollection) => (
                  <div key={myCollection._id}>
                    <CollectionCard
                      name={myCollection.name}
                      id={myCollection._id}
                      img={myCollection.image}
                      banner={myCollection.bannerImage}
                      nfts={myCollection.nfts}
                    />
                  </div>
                ))
              ) : (
                <p className="empty-tab">
                  There are no collections.
                  <Link to="/create-collection">
                    Create your first collection now!
                  </Link>
                </p>
              )}
            </div>
            {totalPagesCollections > 1 && (
              <PaginationRounded
                currentPage={currentPageCollections}
                setCurrentPage={setCurrentPageCollections}
                totalPages={totalPagesCollections}
              />
            )}
          </div>
        )}
        {openLiked && (
          <div className="tab-content">
            <div className="cards">
              {getUserLiked().length > 0 ? (
                getUserLiked().map((likedItem, index) => (
                  <div key={`${likedItem._id}_${index}`}>
                    <NftCard
                      img={likedItem.image}
                      name={likedItem.name}
                      price={likedItem.price}
                      likes={likedItem.likes}
                      id={likedItem._id}
                      collection={getCollectionName(likedItem._id)}
                      created={likedItem.createdAt}
                      ending={likedItem.endingOn}
                      collectionId={likedItem.collectionId}
                      item={likedItem}
                    />
                  </div>
                ))
              ) : (
                <p className="empty-tab">
                  You didn't like any nft yet.
                  <Link to="/shop">Explore NFTs now!</Link>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyProfile;
