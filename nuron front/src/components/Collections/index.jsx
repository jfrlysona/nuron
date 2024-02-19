import React, { useEffect, useState } from "react";
import "./index.scss";
import CollectionCard from "../CollectionCard";
import PaginationRounded from "../Pagination";
function Collections() {
  const [collection, setCollection] = useState([]);
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

  let totalPages = Math.ceil(collection.length / collectionsPerPage);

  return (
    <section id="collections">
      <div className="container">
        <div className="cards">
          {paginatedCollections.map((x) => (
            <CollectionCard
              key={x._id}
              name={x.name}
              id={x._id}
              nfts={x.nfts}
              img={x.image}
              banner={x.bannerImage}
            />
          ))}
        </div>
        <PaginationRounded
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      </div>
    </section>
  );
}

export default Collections;
