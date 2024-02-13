import { jwtDecode } from "jwt-decode";
import React, { createContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [decode, setDecode] = useLocalStorage("decode", null);

  function addToken(token) {
    setToken(token);
    const tokenDecoded = jwtDecode(token);
    setDecode(tokenDecoded);
  }
  function logout() {
    setToken(null);
    setDecode(null);
  }
  return (
    <UserContext.Provider value={{ decode, token, addToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
