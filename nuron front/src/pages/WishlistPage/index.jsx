import React from "react";
import Wishlist from "../../components/Wishlist";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";

function WishlistPage() {
  return (
    <>
      <Helmet>
        <title>Wishlist - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Wishlist"
        prevLink="/shop"
        currentLink="/wishlist"
        prevPage="Shop"
        currentPage="Wishlist"
      />
      <Wishlist />
    </>
  );
}

export default WishlistPage;
