import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import Cart from "../../components/Cart";

function CartPage() {
  return (
    <>
      <Helmet>
        <title>Cart - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Cart"
        prevLink="/shop"
        currentLink="/cart"
        prevPage="Shop"
        currentPage="Cart"
      />
      <Cart />
    </>
  );
}

export default CartPage;
