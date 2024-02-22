import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { Link } from "react-router-dom";
import PaginationRounded from "../Pagination";
import NftCard from "../NftCard";
import "./index.scss";
function Wishlist() {
  const { user } = useContext(UserContext);
  const [nft, setNft] = useState([]);
  const [collection, setCollection] = useState([]);
  const [paginatedNfts, setPaginatedNfts] = useState([]);
  const [nftsPerPage, setNftsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
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
  useEffect(() => {
    if (user.wishlist) {
      const paginatedData = user.wishlist.slice(
        (currentPage - 1) * nftsPerPage,
        currentPage * nftsPerPage
      );
      setPaginatedNfts(paginatedData);
    }
  }, [currentPage, nftsPerPage, user.wishlist]);

  const nftCollectionMap = {};
  collection.forEach((col) => {
    col.nfts.forEach((nftId) => {
      nftCollectionMap[nftId] = col.name;
    });
  });

  function getCollectionName(nftId) {
    return nftCollectionMap[nftId];
  }
  let totalPages = Math.ceil(
    (user.wishlist && user.wishlist.length) / nftsPerPage
  );

  return (
    <section id="wishlist">
      <div className="container">
        <div className="wishlist-cards">
          {paginatedNfts.length !== 0 ? (
            paginatedNfts.map((wishlistItemId) => {
              const matchingNft = nft.find(
                (nftItem) => nftItem._id === wishlistItemId
              );
              return (
                matchingNft && (
                  <NftCard
                    key={matchingNft._id}
                    img={matchingNft.image}
                    name={matchingNft.name}
                    price={matchingNft.price}
                    likes={matchingNft.likes}
                    id={matchingNft._id}
                    collection={getCollectionName(matchingNft._id)}
                    created={matchingNft.createdAt}
                    ending={matchingNft.endingOn}
                    collectionId={matchingNft.collectionId}
                    item={matchingNft}
                  />
                )
              );
            })
          ) : (
            <p className="empty-wishlist">
              Wishlist is empty. Back to <Link to="/shop">shop page</Link>
            </p>
          )}
        </div>
        {totalPages > 1 && (
          <PaginationRounded
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </section>
  );
}

export default Wishlist;
