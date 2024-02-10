import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import "./style.css";
import "./odemeter.css";
import { HelmetProvider } from "react-helmet-async";
import WishlistProvider from "./context/WIshlistProvider/index.jsx";
import ThemeProvider from "./context/ThemeProvider/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <WishlistProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </WishlistProvider>
    </HelmetProvider>
  </React.StrictMode>
);
