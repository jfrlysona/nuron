import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

function Navbar() {
  const { handleTheme } = useContext(ThemeContext);
  return (
    <div>
      Navbar
      <button onClick={handleTheme}>theme</button>
    </div>
  );
}

export default Navbar;
