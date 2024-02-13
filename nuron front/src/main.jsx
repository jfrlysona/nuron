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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <WishlistProvider>
        <ThemeProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ThemeProvider>
      </WishlistProvider>
    </HelmetProvider>
  </React.StrictMode>
);
