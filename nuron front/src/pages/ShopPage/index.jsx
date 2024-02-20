import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import Shop from "../../components/Shop";
function ShopPage() {
  return (
    <>
    <Helmet>
      <title>Shop - Nuron</title>
      <link
        rel="shortcut icon"
        href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
        type="image/x-icon"
      />
    </Helmet>
    <Header
      title="Shop"
      prevLink="/"
      currentLink="/shop"
      prevPage="Home"
      currentPage="Shop"
    />
    <Shop />
  </>
  )
}

export default ShopPage