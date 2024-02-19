import React from "react";
import HomeHeader from "../../components/HomeHeader";
import BrandArea from "../../components/brandArea";
import VideoArea from "../../components/VideoArea";
import { Helmet } from "react-helmet-async";
import TopCollection from "../../components/TopCollection";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>NFT Auction - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <HomeHeader />
      <TopCollection/>
      <VideoArea />
      <BrandArea />
    </>
  );
}

export default HomePage;
