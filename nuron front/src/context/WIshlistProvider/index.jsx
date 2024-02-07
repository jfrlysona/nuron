import React, { createContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
export const WishlistContext = createContext();
function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  function addWishlist(item) {
    if (wishlist.find((x) => x.id === item.id)) {
      setWishlist(wishlist.filter((x) => x.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  }

  function removeItemWishlist(item) {
    setWishlist(wishlist.filter((x) => x.id !== item.id));
  }

  function isWishlist(item) {
    return wishlist.findIndex((x) => x.id === item.id) === -1 ? false : true;
  }

  const datas = { wishlist, addWishlist, removeItemWishlist, isWishlist };
  return (
    <WishlistContext.Provider value={datas}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
