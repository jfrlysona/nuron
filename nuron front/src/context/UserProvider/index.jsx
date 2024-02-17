import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [decode, setDecode] = useLocalStorage("decode", null);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (decode && decode.userId) {
      fetch("http://localhost:3000/user/" + decode.userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [decode, token]);

  function addToken(token) {
    setToken(token);
    const tokenDecoded = jwtDecode(token);
    setDecode(tokenDecoded);
  }
  function logout() {
    setToken(null);
    setDecode(null);
    localStorage.clear();
  }
  return (
    <UserContext.Provider value={{ decode, token, addToken, logout,user,setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
