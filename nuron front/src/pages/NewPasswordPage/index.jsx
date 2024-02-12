import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import NewPassword from "../../components/NewPassword";

function NewPasswordPage() {
  return (
    <>
      <Helmet>
        <title>New Password - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="New Password"
        prevLink="/"
        currentLink="/new-password"
        prevPage="Home"
        currentPage="New Password"
      />
      <NewPassword />
    </>
  );
}

export default NewPasswordPage;
