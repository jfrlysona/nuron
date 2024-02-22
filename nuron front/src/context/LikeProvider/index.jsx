import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider";
export const LikeContext = createContext();
function LikeProvider({ children }) {
  const { decode, token, user, setUser } = useContext(UserContext);
  const [nft, setNft] = useState([]);
  const [selectedNft, setSelectedNft] = useState({});
  const [like, setLike] = useState(false);
  const [likedByUser, setLikedByUser] = useState(false);
  const likedNfts = user.likedNfts || [];

  useEffect(() => {
    fetch("http://localhost:3000/nft/")
      .then((res) => res.json())
      .then((data) => setNft(data));
  }, []);

  const likeNft = async (itemId) => {
    try {
      let updatedLikes = [...nft.find((x) => x._id === itemId).likes];
      let newLikeStatus = !like;

      if (newLikeStatus) {
        updatedLikes.push(decode.userId);
      } else {
        updatedLikes = updatedLikes.filter(
          (userId) => userId !== decode.userId
        );
      }

      const response = await fetch("http://localhost:3000/nft/" + itemId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          likes: updatedLikes,
        }),
      });

      const data = await response.json();
      setSelectedNft(data);
      setLike(newLikeStatus);
      if (newLikeStatus) {
        addLikeToUser(itemId);
      } else {
        removeLikeFromUser(itemId);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function addLikeToUser(itemId) {
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
            likedNfts: [...likedNfts, itemId],
          }),
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function removeLikeFromUser(itemId) {
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
            likedNfts: likedNfts.filter((nftId) => nftId !== itemId),
          }),
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function checkIfUserLikedNft(itemId) {
    return user && user.likedNfts && user.likedNfts.includes(itemId);
  }

  const data = {
    likeNft,
    addLikeToUser,
    removeLikeFromUser,
    checkIfUserLikedNft,
  };
  return <LikeContext.Provider value={data}>{children}</LikeContext.Provider>;
}

export default LikeProvider;
