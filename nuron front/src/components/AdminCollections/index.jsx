import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import PaginationRounded from "../Pagination";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserProvider";

const successToast = () => toast.success("Successfully deleted!");
const errorToast = () => toast.error("Not deleted!");

function AdminCollections() {
  const [collection, setCollection] = useState([]);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [paginatedCollections, setPaginatedCollections] = useState([]);
  const [collectionsPerPage, setCollectionsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/collection")
      .then((res) => res.json())
      .then((data) => setCollection(data));
  }, []);

  useEffect(() => {
    const paginatedData = collection.slice(
      (currentPage - 1) * collectionsPerPage,
      currentPage * collectionsPerPage
    );
    setPaginatedCollections(paginatedData);
  }, [currentPage, collectionsPerPage, collection]);

  async function deleteCollection(id) {
    try {
      const response = await fetch("http://localhost:3000/collection/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setCollection((prevCollection) =>
          prevCollection.filter((collection) => collection._id !== id)
        );
        successToast();
      } else {
        errorToast();
      }
    } catch (error) {
      errorToast();
    }
  }

  let totalPages = Math.ceil(collection.length / collectionsPerPage);
  return (
    <section id="adminCollections">
      <div className="container">
        <h1>All Collections</h1>
        <div className="cards">
          {paginatedCollections.map((y) => (
            <div className="card" key={y._id}>
              <div
                className="img"
                onClick={() => navigate("/collection/" + y._id)}
              >
                <img src={y.image} alt="collection image" />
              </div>
              <div className="text">
                <Link to={"/collection/" + y._id}>{y.name}</Link>
                <div className="icons-card-admin">
                  <div
                    className="delete"
                    onClick={() => deleteCollection(y._id)}
                  >
                    <i className="fa-light fa-trash"></i>
                    <span>Delete Collection</span>
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

export default AdminCollections;
