import React from "react";
import { Helmet } from "react-helmet-async";
import NotFound from "../../components/NotFound";

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Not Found - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <NotFound />
    </>
  );
}

export default NotFoundPage;
