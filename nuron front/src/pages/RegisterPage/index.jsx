import React from "react";
import { Helmet } from "react-helmet-async";
import SignUp from "../../components/SignUp";
import Header from "../../components/Header";
function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Sign Up - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Sign Up"
        prevLink="/"
        currentLink="/sign-up"
        prevPage="Home"
        currentPage="Sign Up"
      />
      <SignUp />
    </>
  );
}

export default RegisterPage;
