import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
function CreateVariants() {
  const navigate = useNavigate();
  return (
    <section id="createVariants">
      <div className="container">
        <h1>Create Variants</h1>
        <p>
          Create your unique collection and easily mint NFTs directly into it{" "}
          <br />
          or create a single NFT
        </p>
        <div className="create-cards">
          <div className="create-card">
            <img
              src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fupload-variants%2Fmultiple.jpg&w=640&q=75"
              alt=""
            />
            <button onClick={() => navigate("/create-collection")}>
              Create Collection
            </button>
          </div>
          <div className="create-card">
            <img
              src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fupload-variants%2Fsingle.jpg&w=640&q=75"
              alt=""
            />
            <button onClick={() => navigate("/create-nft")}>Create NFT</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateVariants;
