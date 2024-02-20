import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import NftDetails from "../../components/NftDetails";

function NftDetailsPage() {
  return (
    <>
      <Helmet>
        <title>NFT Details - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="NFT Details"
        prevLink="/shop"
        currentLink="/nft/:id"
        prevPage="Shop"
        currentPage="NFT Details"
      />
      <NftDetails />
    </>
  );
}

export default NftDetailsPage;
