import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import NftCard from "../NftCard";
function ExploreProducts() {
  const [nft, setNft] = useState([]);
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/collection")
      .then((res) => res.json())
      .then((data) => setCollection(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/nft")
      .then((res) => res.json())
      .then((data) => setNft(data.slice(0, 5)));
  }, []);

  function getCollectionName(nftId) {
    const nftCollectionMap = {};
    collection.forEach((col) => {
      col.nfts.forEach((nftId) => {
        nftCollectionMap[nftId] = col.name;
      });
    });
    return nftCollectionMap[nftId];
  }
  return (
    <section id="ExploreProducts">
      <div className="container">
        <div className="title">
          <h1>Explore Products</h1>
          <Link to="/shop">
            view all <i className="fa-light fa-arrow-right"></i>
          </Link>
        </div>
        <div className="cards">
          {nft.map((x) => (
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
      </div>
    </section>
  );
}

export default ExploreProducts;
