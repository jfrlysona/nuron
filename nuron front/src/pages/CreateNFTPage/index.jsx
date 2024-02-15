import React from "react";
import { Helmet } from "react-helmet-async";
import CreateNFT from "../../components/CreateNFT";
import Header from "../../components/Header";

function CreateNFTPage() {
  return (
    <>
      <Helmet>
        <title>Create NFT - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Create NFT"
        prevLink="/"
        currentLink="/create-nft"
        prevPage="Home"
        currentPage="Create NFT"
      />
      <CreateNFT />
    </>
  );
}

export default CreateNFTPage;
