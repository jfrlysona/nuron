import React, { createContext } from "react";
import useDarkMode from "../../hooks/useDarkMode";
export const ThemeContext = createContext();
function ThemeProvider({ children }) {
  const { theme, handleTheme } = useDarkMode();

  const data = {
    theme,
    handleTheme,
  };
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
