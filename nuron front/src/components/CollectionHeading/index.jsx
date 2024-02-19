import React from "react";
import "./index.scss";
function CollectionHeading({ banner, img, name }) {
  return (
    <div
      className="collectionHeading"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="content">
        <img src={img} alt="image collection" />
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default CollectionHeading;
