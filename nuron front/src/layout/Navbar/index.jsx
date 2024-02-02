import React from "react";
import useDarkMode from "../../hooks/useDarkMode";

function Navbar() {
  const { handleTheme } = useDarkMode();
  return (
    <div>
      Navbar
      <button onClick={handleTheme}>theme</button>
    </div>
  );
}

export default Navbar;
