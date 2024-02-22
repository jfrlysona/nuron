import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CollectionCard from "../CollectionCard";
import NftCard from "../NftCard";
import PaginationRounded from "../Pagination";
import "./index.scss";
function UserProfile() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [openNfts, setOpenNfts] = useState(true);
  const [openCollections, setOpenCollections] = useState(false);
  const [nft, setNft] = useState([]);
  const [collection, setCollection] = useState([]);
  const [paginatedUserNfts, setPaginatedUserNfts] = useState([]);
  const [paginatedUserCollections, setPaginatedUserCollections] = useState([]);
  const [nftsPerPage, setNftsPerPage] = useState(10);
  const [collectionsPerPage, setCollectionsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCollections, setCurrentPageCollections] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/user/" + id)
      .then((res) => res.json())
      .then((data) => setUserDetails(data));
  }, []);

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
    if (userDetails.collections) {
      userDetails.collections.forEach((collectionId) => {
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
    if (userDetails.collections) {
      userDetails.collections.forEach((collectionId) => {
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
  }, [currentPage, nftsPerPage, userDetails.collections, collection, nft]);

  useEffect(() => {
    if (getUserCollections()) {
      const paginatedData = getUserCollections().slice(
        (currentPageCollections - 1) * collectionsPerPage,
        currentPageCollections * collectionsPerPage
      );
      setPaginatedUserCollections(paginatedData);
    }
  }, [currentPageCollections, collectionsPerPage, userDetails.collections, collection]);

  let totalPagesNfts = Math.ceil(
    (getUserNFTs() && getUserNFTs().length) / nftsPerPage
  );
  let totalPagesCollections = Math.ceil(
    (getUserCollections() && getUserCollections().length) / collectionsPerPage
  );
  return (
    <section id="UserProfile">
      <div
        className="UserProfileHeading"
        style={
          userDetails.bannerImage
            ? { backgroundImage: `url(${userDetails.bannerImage})` }
            : {
                background:
                  "radial-gradient(circle, var(--banner-color) 0%, rgba(148,187,233,1) 100%",
              }
        }
      >
        <div className="content">
          {userDetails.profileImage ? (
            <img src={userDetails.profileImage} alt="avatar" />
          ) : (
            <div className="user-prof-i">
              <i className="fa-solid fa-user"></i>
            </div>
          )}

          <h2>
            {userDetails.firstName} {userDetails.lastName}
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="proftext">
          <div className="bio">
            <i className="fa-light fa-thumbtack"></i>
            {userDetails.bio ? <p>{userDetails.bio}</p> : <p>...</p>}
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
            }}
          >
            NFTs
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
            }}
          >
            Collections
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
                  User has no NFTs yet
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
                  User has no collections yet
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
      </div>
    </section>
  );
}

export default UserProfile;
