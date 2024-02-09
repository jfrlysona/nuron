import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <section id="not-found">
      <div className="container">
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>The page you are looking for not available.</p>
        <button onClick={() => navigate("/")}>Go Back To Home</button>
      </div>
    </section>
  );
}

export default NotFound;
