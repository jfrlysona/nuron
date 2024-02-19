import React from "react";
import CollectionDetails from "../../components/CollectionDetails";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";

function CollectionDetailsPage() {
  return (
    <>
      <Helmet>
        <title>Collection Details - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <CollectionDetails />
    </>
  );
}

export default CollectionDetailsPage;
