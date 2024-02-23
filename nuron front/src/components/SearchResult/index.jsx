import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchProvider";
import "./index.scss";
import { Link } from "react-router-dom";
function SearchResult() {
  const { searchQuery, search } = useContext(SearchContext);
  const { filteredUsers, filteredNFTs, filteredCollections } = search();

  return (
    <section id="search">
      <h2>Search Results for "{searchQuery}"</h2>
      <h3>Users</h3>
      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user._id}>
              <Link
                to={"/user/" + user._id}
              >{`${user.firstName} ${user.lastName}`}</Link>
            </li>
          ))}
        </ul>
      )}

      <h3>Collection</h3>
      {filteredCollections.length === 0 ? (
        <p>No Collections found</p>
      ) : (
        <ul>
          {filteredCollections.map((collection) => (
            <li key={collection._id}>
              <Link
                to={"/collection/" + collection._id}
              >{`${collection.name}`}</Link>
            </li>
          ))}
        </ul>
      )}
      <h3>NFTs</h3>
      {filteredNFTs.length === 0 ? (
        <p>No NFTs found</p>
      ) : (
        <ul>
          {filteredNFTs.map((nft) => (
            <li key={nft._id}>
              <Link to={"/nft/" + nft._id}>{`${nft.name}`}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SearchResult;
