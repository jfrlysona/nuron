import React, { useEffect, useState } from "react";
import "./index.scss";
import CollectionCard from "../CollectionCard";
import { Link } from "react-router-dom";
function TopCollection() {
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/collection")
      .then((res) => res.json())
      .then((data) => setCollection(data.slice(0,4)));
  }, []);
  return (
    <section id="topCollection">
      <div className="container">
        <div className="title">
          <h1>Top Collection</h1>
          <Link to="collections">view all <i className="fa-light fa-arrow-right"></i></Link>
        </div>
        <div className="cards">
          {collection.map((x) => (
            <CollectionCard
              key={x._id}
              name={x.name}
              id={x._id}
              nfts={x.nfts}
              img={x.image}
              banner={x.bannerImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopCollection;
