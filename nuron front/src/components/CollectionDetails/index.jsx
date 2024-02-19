import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CollectionHeading from "../CollectionHeading";
import "./index.scss";
import NftCard from "../NftCard";

function CollectionDetails() {
  const { id } = useParams();
  const [collection, setCollection] = useState({});
  const [author, setAuthor] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [nft, setNft] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/collection/" + id)
      .then((res) => res.json())
      .then((data) => setCollection(data));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3000/user/")
      .then((res) => res.json())
      .then((data) =>
        setAuthor(data.find((x) => x._id === collection.createdBy))
      );
  }, [collection.createdBy]);

  useEffect(() => {
    fetch("http://localhost:3000/nft/")
      .then((res) => res.json())
      .then((data) => setNft(data));
  }, []);

  const formattedDate = new Date(collection.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  return (
    <section id="collectionDetails">
      <CollectionHeading
        banner={collection.bannerImage}
        img={collection.image}
        name={collection.name}
      />
      <div className="container">
        <div className="text">
          <div
            className="description"
            style={
              seeMore
                ? {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "15px",
                  }
                : null
            }
          >
            <p
              style={
                seeMore
                  ? {
                      textOverflow: "clip",
                      overflow: "visible",
                      whiteSpace: "wrap",
                      height: "100%",
                    }
                  : null
              }
            >
              {collection.description}
            </p>
            <span onClick={() => setSeeMore(!seeMore)}>
              {seeMore ? " See less" : "See more"}
            </span>
          </div>
          <div className="info">
            <p>
              Total items
              <span>{collection.nfts && collection.nfts.length}</span>
            </p>
            <p>
              Created <span>{formattedDate}</span>
            </p>
            <p>
              Creator
              <span>
                {author ? (
                  <Link to={`/user/${author._id}`}>
                    {author.firstName} {author.lastName}
                  </Link>
                ) : (
                  "Unknown"
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="items">
          <h2>Items</h2>
          <div className="nfts">
            {collection.nfts && collection.nfts.length > 0 ? (
              collection.nfts.map((nftId) => {
                const foundNft = nft.find((nftItem) => nftItem._id === nftId);
                return foundNft ? (
                  <NftCard key={nftId} img={foundNft.image} name={foundNft.name}  price={foundNft.price} likes={foundNft.likes} />
                ) : null;
              })
            ) : (
              <p>There are no NFTs in this collection yet</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollectionDetails;
