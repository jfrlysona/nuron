import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider";
export const WishlistContext = createContext();
function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  function addWishlist(item) {
    const index = wishlist.findIndex((x) => x.id === item._id);
    if (index === -1) {
      setWishlist([...wishlist, { ...item, count: 1 }]);
    } else {
      removeItemWishlist(item);
    }
  }

  function removeItemWishlist(item) {
    setWishlist(wishlist.filter((x) => x.id !== item._id));
  }

  function isWishlist(item) {
    return wishlist.findIndex((x) => x.id === item._id) === -1 ? false : true;
  }

  const data = { wishlist, addWishlist, removeItemWishlist, isWishlist };
  return (
    <WishlistContext.Provider value={data}>{children}</WishlistContext.Provider>
  );
}

export default WishlistProvider;
