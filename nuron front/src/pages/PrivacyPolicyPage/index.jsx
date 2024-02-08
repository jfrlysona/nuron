import React from "react";
import PrivacyPolicy from "../../components/PrivacyPolicy/index";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";

function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Privacy Policy"
        prevLink="/"
        currentLink="/privacy-policy"
        prevPage="Home"
        currentPage="Privacy Policy"
      />
      <PrivacyPolicy />
    </>
  );
}

export default PrivacyPolicyPage;
