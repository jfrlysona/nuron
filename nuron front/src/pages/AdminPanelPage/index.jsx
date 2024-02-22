import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import AdminPanel from "../../components/AdminPanel";

function AdminPanelPage() {
  return (
    <>
      <Helmet>
        <title>Admin Panel - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Admin Panel"
        prevLink="/my-profile"
        currentLink="/admin-panel"
        prevPage="My Profile"
        currentPage="Admin Panel"
      />
      <AdminPanel />
    </>
  );
}

export default AdminPanelPage;
