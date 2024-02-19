import React from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
function CollectionCard({ name, id, img, banner, nfts }) {
  const navigate = useNavigate();
  return (
    <div id="collectionCard" onClick={()=>navigate("/collection/" + id)}>
      <div className="images">
        <div className="banner-border">
          <img src={banner} alt="" className="img-banner" />
        </div>
        <div className="img-round-border">
          <img src={img} alt="" className="img-round" />
        </div>
      </div>
      <div className="text">
        <Link to={"/collection/" + id}>{name}</Link>
        <span>{nfts.length} items</span>
      </div>
    </div>
  );
}

export default CollectionCard;
