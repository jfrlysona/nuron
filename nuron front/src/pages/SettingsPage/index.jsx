import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import Settings from "../../components/Settings";

function SettingsPage() {
  return (
    <>
      <Helmet>
        <title>Settings - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Settings"
        prevLink="/"
        currentLink="/settings"
        prevPage="Home"
        currentPage="Settings"
      />
      <Settings />
    </>
  );
}

export default SettingsPage;
