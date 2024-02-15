import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import CreateVariants from "../../components/CreateVariants";

function CreateVariantsPage() {
  return (
    <>
      <Helmet>
        <title>Create Variants - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Create Variants"
        prevLink="/"
        currentLink="/create-variants"
        prevPage="Home"
        currentPage="Create Variants"
      />
      <CreateVariants />
    </>
  );
}

export default CreateVariantsPage;
