import React from "react";
import { Helmet } from "react-helmet-async";
import MyProfile from "../../components/MyProfile";

function MyProfilePage() {
  return (
    <>
      <Helmet>
        <title>My Profile - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <MyProfile />
    </>
  );
}

export default MyProfilePage;
