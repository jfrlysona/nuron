import React from "react";
import { Helmet } from "react-helmet-async";
import UserProfile from "../../components/UserProfile";

function UserProfilePage() {
  return (
    <>
      <Helmet>
        <title>User Profile - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <UserProfile />
    </>
  );
}

export default UserProfilePage;
