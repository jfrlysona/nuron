import React, { createContext, useEffect, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/collection")
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/nft")
      .then((res) => res.json())
      .then((data) => setNfts(data));
  }, []);
  const search = () => {
    const filteredUsers = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    const filteredNFTs = nfts.filter((nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredCollections = collections.filter((collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { filteredUsers, filteredNFTs, filteredCollections };
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, search }}>
      {children}
    </SearchContext.Provider>
  );
};
