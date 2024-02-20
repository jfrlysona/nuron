import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";

function Wishlist() {
  const { user } = useContext(UserContext);
  const [nft, setNft] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/nft")
      .then((res) => res.json())
      .then((data) => setNft(data));
  }, []);

  return (
    <section id="wishlist">
      <div className="container">
        {user.wishlist &&
          user.wishlist.map((wishlistItemId) => {
            const matchingNft = nft.find(
              (nftItem) => nftItem._id === wishlistItemId
            );
            return matchingNft ? (
              <p key={matchingNft._id}>{matchingNft.name}</p>
            ) : null;
          })}
      </div>
    </section>
  );
}

export default Wishlist;
