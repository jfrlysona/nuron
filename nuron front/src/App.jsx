import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./hooks/ScrollToTop";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsPage from "./pages/TermsPage";
import PrivateRouter from "./routes/PrivateRouter";
import CreateVariantsPage from "./pages/CreateVariantsPage";
import CreateNFTPage from "./pages/CreateNFTPage";
import CreateCollectionPage from "./pages/CreateCollectionPage";
import SettingsPage from "./pages/SettingsPage";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionDetailsPage from "./pages/CollectionDetailsPage";
import ShopPage from "./pages/ShopPage";
import NftDetailsPage from "./pages/NftDetailsPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <>
      <div className="bg"></div>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/new-password" element={<NewPasswordPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collection/:id" element={<CollectionDetailsPage />} />
              <Route path="/nft/:id" element={<NftDetailsPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/shop" element={<ShopPage/>} />
              <Route element={<PrivateRouter roles={["User", "Admin"]} />}>
                <Route path="/wishlist" element={<WishlistPage />}/>
                <Route path="/create-variants" element={<CreateVariantsPage />} />
                <Route path="/create-nft" element={<CreateNFTPage />} />
                <Route path="/create-collection" element={<CreateCollectionPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
      {/* "/create-nft" */}
    </>
  );
}

export default App;
