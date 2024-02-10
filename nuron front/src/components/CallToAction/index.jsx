import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
function CallToAction() {
  const navigate = useNavigate();
  return (
    <div id="callToAction">
      <h1>
        Discover rare digital art <br /> and collect NFTs
      </h1>
      <p>
        Partner with one of the world’s largest retailers to showcase your brand
        and products
      </p>
      <div className="btns">
        <button className="btn-create" onClick={() => navigate("/create-nft")}>
          Create
        </button>
        <button className="btn-contact" onClick={() => navigate("/contact")}>
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default CallToAction;
