import React from "react";
import Header from "../../components/Header";
import AdminNfts from "../../components/AdminNfts";
import { Helmet } from "react-helmet-async";

function AdminNftsPage() {
  return (
    <>
      <Helmet>
        <title>Admin Panel | NFTs - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Admin Panel NFTs"
        prevLink="/admin-panel"
        currentLink="/admin-panel/nfts"
        prevPage="Admin Panel"
        currentPage="Admin Panel NFTs"
      />
      <AdminNfts />
    </>
  );
}

export default AdminNftsPage;
