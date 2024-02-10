import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import Blog from "../../components/Blog";

function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Our Blog"
        prevLink="/"
        currentLink="/blog"
        prevPage="Home"
        currentPage="Our Blog"
      />
      <Blog />
    </>
  );
}

export default BlogPage;
