import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useDarkMode() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
    }
  }, [theme]);

  function handleTheme() {
    if (document.body.classList.contains("light")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    document.body.classList.toggle("light");
  }
  return { theme, handleTheme };
}

export default useDarkMode;
