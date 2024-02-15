import React from "react";
import { Helmet } from "react-helmet-async";
import CreateCollection from "../../components/CreateCollection";
import Header from "../../components/Header";

function CreateCollectionPage() {
  return (
    <>
      <Helmet>
        <title>Create Collection - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Create Collection"
        prevLink="/"
        currentLink="/create-collection"
        prevPage="Home"
        currentPage="Create Collection"
      />
      <CreateCollection />
    </>
  );
}

export default CreateCollectionPage;
