import React from "react";
import Header from "../../components/Header";
import AdminCollections from "../../components/AdminCollections";
import { Helmet } from "react-helmet-async";

function AdminCollectionsPage() {
  return (
    <>
      <Helmet>
        <title>Admin Panel | Collections - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Admin Panel Collections"
        prevLink="/admin-panel"
        currentLink="/admin-panel/collections"
        prevPage="Admin Panel"
        currentPage="Admin Panel Collections"
      />
      <AdminCollections />
    </>
  );
}

export default AdminCollectionsPage;
