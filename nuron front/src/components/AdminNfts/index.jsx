import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import PaginationRounded from "../Pagination";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserProvider";

const successToast = () => toast.success("Successfully deleted!");
const errorToast = () => toast.error("Not deleted!");

function AdminNfts() {
  const [nft, setNft] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [paginatedNfts, setPaginatedNfts] = useState([]);
  const [nftsPerPage, setNftsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch("http://localhost:3000/nft")
      .then((res) => res.json())
      .then((data) => setNft(data));
  }, []);

  useEffect(() => {
    const paginatedData = nft.slice(
      (currentPage - 1) * nftsPerPage,
      currentPage * nftsPerPage
    );
    setPaginatedNfts(paginatedData);
  }, [currentPage, nftsPerPage, nft]);

  async function deleteNft(id) {
    try {
      const response = await fetch("http://localhost:3000/nft/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setNft((prevNft) => prevNft.filter((nft) => nft._id !== id));
        successToast();
      } else {
        errorToast();
      }
    } catch (error) {
      errorToast();
    }
  }

  let totalPages = Math.ceil(nft.length / nftsPerPage);

  return (
    <section id="adminNfts">
      <div className="container">
        <h1>All NFTs</h1>
        <div className="cards">
          {paginatedNfts.map((z) => (
            <div className="card" key={z._id}>
              <div className="img" onClick={() => navigate("/nft/" + z._id)}>
                <img src={z.image} alt="nft image" />
              </div>
              <div className="text">
                <Link to={"/nft/" + z._id}>{z.name}</Link>
                <div className="icons-card-admin">
                  <div className="delete" onClick={() => deleteNft(z._id)}>
                    <i className="fa-light fa-trash"></i>
                    <span>Delete NFT</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <PaginationRounded
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
        <Toaster position="bottom-right" />
      </div>
    </section>
  );
}

export default AdminNfts;
