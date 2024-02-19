import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import Collections from "../../components/Collections";

function CollectionsPage() {
  return (
    <>
      <Helmet>
        <title>Collections - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Collections"
        prevLink="/"
        currentLink="/ccllections"
        prevPage="Home"
        currentPage="Collections"
      />
      <Collections />
    </>
  );
}

export default CollectionsPage;
