import React, { createContext, useContext } from "react";
import { UserContext } from "../UserProvider";
export const WishlistContext = createContext();
function WishlistProvider({ children }) {
  const { decode, token, user, setUser } = useContext(UserContext);
  const wishlist = user.wishlist || [];
  async function addWishlist(itemId) {
    try {
      const response = await fetch(
        "http://localhost:3000/user/" + decode.userId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            wishlist: [...wishlist, itemId],
          }),
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function removeItemWishlist(itemId) {
    try {
      const response = await fetch(
        "http://localhost:3000/user/" + decode.userId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            wishlist: wishlist.filter((nftId) => nftId !== itemId),
          }),
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const data = { wishlist, addWishlist, removeItemWishlist };
  return (
    <WishlistContext.Provider value={data}>{children}</WishlistContext.Provider>
  );
}

export default WishlistProvider;
