import React from "react";
import { Helmet } from "react-helmet-async";
import Login from "../../components/Login";
import Header from "../../components/Header";

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Log In - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Log In"
        prevLink="/"
        currentLink="/login"
        prevPage="Home"
        currentPage="Log In"
      />
      <Login />
    </>
  );
}

export default LoginPage;
