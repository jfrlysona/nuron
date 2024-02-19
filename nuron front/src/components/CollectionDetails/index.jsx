import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CollectionHeading from "../CollectionHeading";
import "./index.scss";

function CollectionDetails() {
  const { id } = useParams();
  const [collection, setCollection] = useState({});
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/collection/" + id)
      .then((res) => res.json())
      .then((data) => setCollection(data));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3000/user/")
      .then((res) => res.json())
      .then((data) =>
        setAuthor(data.find((x) => x._id === collection.createdBy))
      );
  }, [collection.createdBy]);
  const formattedDate = new Date(collection.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  return (
    <section id="collectionDetails">
      <CollectionHeading
        banner={collection.bannerImage}
        img={collection.image}
        name={collection.name}
      />
      <div className="container">
        <div className="text">
          <p>{collection.description}</p>
          <div className="info">
            <p>
              Total items
              <span>{collection.nfts && collection.nfts.length}</span>
            </p>
            <p>
              Created <span>{formattedDate}</span>
            </p>
            <p>
              Creator
              <span>
                {author ? (
                  <Link to={`/user/${author._id}`}>
                    {author.firstName} {author.lastName}
                  </Link>
                ) : (
                  "Unknown"
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollectionDetails;
