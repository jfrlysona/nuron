import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import About from "../../components/About";

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="About"
        prevLink="/"
        currentLink="/about"
        prevPage="Home"
        currentPage="About"
      />
      <About />
    </>
  );
}

export default AboutPage;
