import React from "react";
import Header from "../../components/Header";
import AdminUsers from "../../components/AdminUsers";
import { Helmet } from "react-helmet-async";

function AdminUsersPage() {
  return (
    <>
      <Helmet>
        <title>Admin Panel | Users - Nuron</title>
        <link
          rel="shortcut icon"
          href="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/cropped-logo-white-64x64.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header
        title="Admin Panel Users"
        prevLink="/admin-panel"
        currentLink="/admin-panel/users"
        prevPage="Admin Panel"
        currentPage="Admin Panel Users"
      />
      <AdminUsers />
    </>
  );
}

export default AdminUsersPage;
