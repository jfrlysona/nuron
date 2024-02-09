import React from "react";
import Header from "../../components/Header";
import { Helmet } from "react-helmet-async";
import Contact from "../../components/Contact";

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Contact"
        prevLink="/"
        currentLink="/contact"
        prevPage="Home"
        currentPage="Contact"
      />
      <Contact />
    </>
  );
}

export default ContactPage;
