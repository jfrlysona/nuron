import React from "react";
import ResetPassword from "../../components/ResetPassword";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";

function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Reset Password - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Reset Password"
        prevLink="/"
        currentLink="/reset-password"
        prevPage="Home"
        currentPage="Reset Password"
      />
      <ResetPassword />
    </>
  );
}

export default ResetPasswordPage;
