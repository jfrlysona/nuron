import React from "react";
import Terms from "../../components/Terms";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";

function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Terms"
        prevLink="/"
        currentLink="/terms"
        prevPage="Home"
        currentPage="Terms"
      />
      <Terms />
    </>
  );
}

export default TermsPage;
