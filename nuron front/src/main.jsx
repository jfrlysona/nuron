import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeProvider/index.jsx";
import UserProvider from "./context/UserProvider/index.jsx";
import WishlistProvider from "./context/WIshlistProvider/index.jsx";
import "./index.scss";
import "./odemeter.css";
import "./style.css";
import CartProvider from "./context/CartProvider/index.jsx";
import LikeProvider from "./context/LikeProvider/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <UserProvider>
          <WishlistProvider>
            <CartProvider>
              <LikeProvider>
                <App />
              </LikeProvider>
            </CartProvider>
          </WishlistProvider>
        </UserProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
