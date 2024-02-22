import React, { useEffect, useState } from "react";
import "./index.scss";
import PaginationRounded from "../Pagination";
import NftCard from "../NftCard";
function Shop() {
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
    const paginatedData = nft.slice(
      (currentPage - 1) * nftsPerPage,
      currentPage * nftsPerPage
    );
    setPaginatedNfts(paginatedData);
  }, [currentPage, nftsPerPage, nft]);

  const nftCollectionMap = {};
  collection.forEach((col) => {
    col.nfts.forEach((nftId) => {
      nftCollectionMap[nftId] = col.name;
    });
  });

  function getCollectionName(nftId) {
    return nftCollectionMap[nftId];
  }
  let totalPages = Math.ceil(nft.length / nftsPerPage);
  return (
    <section id="shop">
      <div className="container">
        <div className="cards">
          {paginatedNfts.map((x) => (
            <NftCard
              key={x._id}
              img={x.image}
              name={x.name}
              price={x.price}
              likes={x.likes}
              id={x._id}
              collection={getCollectionName(x._id)}
              collectionId={x.collectionId}
              item={x}
            />
          ))}
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

export default Shop;
