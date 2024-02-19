import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { UserContext } from "../../context/UserProvider";
import "./index.scss";
import { Link, json } from "react-router-dom";

const successToast = () => toast.success("NFT is created!");
const errorToast = () => toast.error("NFT is not created!");

function CreateNFT() {
  const { user, token } = useContext(UserContext);
  const [nft, setNft] = useState({});
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [collection, setCollection] = useState([]);
  const imageInput = useRef();

  useEffect(() => {
    fetch("http://localhost:3000/collection")
      .then((res) => res.json())
      .then((data) => setCollection(data));
  }, []);

  const createNewNft = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("tags", values.tags);
      formData.append("price", values.price);
      formData.append("endingOn", values.endingOn);
      formData.append("authorId", user._id);
      formData.append("collectionId", values.collectionId);

      const response = await fetch("http://localhost:3000/nft", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      setNft(data);
      successToast();
      resetForm();
    } catch (error) {
      console.log(error.message);
      errorToast();
    }
  };

  const changeImage = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <section id="createNft">
      <div className="container">
        <input
          type="file"
          style={{ display: "none" }}
          onChange={changeImage}
          ref={imageInput}
        />
        <div className="images">
          {previewImage ? (
            <>
              <img src={previewImage} alt="preview" />
              <i
                className="fa-duotone fa-paintbrush"
                onClick={() => imageInput.current.click()}
              ></i>
            </>
          ) : (
            <i
              className="fa-light fa-upload"
              onClick={() => imageInput.current.click()}
            ></i>
          )}
        </div>

        <Formik
          initialValues={{
            name: "",
            description: "",
            category: "",
            tags: "",
            price: 0,
            endingOn: "",
            collectionId: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(5, "Must be 5 characters at least")
              .required("Required"),
            description: Yup.string()
              .min(20, "Must be 20 characters at least")
              .required("Required"),
            category: Yup.string().required("Required"),
            tags: Yup.string().required("At least one tag is required"),
            price: Yup.number()
              .min(0, "Must be a positive number")
              .required("Required"),
            endingOn: Yup.date().required("Required"),
            collectionId: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            createNewNft(values, { resetForm });
          }}
        >
          <Form>
            <div id="my-radio-group">Select Collection</div>
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="collection-group"
            >
              {user?.collections && user.collections.length > 0 ? (
                user.collections.map((collectionId) => {
                  const selectedCollection = collection.find(
                    (item) => item._id === collectionId
                  );
                  return (
                    <label key={collectionId}>
                      <Field
                        type="radio"
                        name="collectionId"
                        value={collectionId}
                      />
                      {selectedCollection && (
                        <div className="collectionInfo">
                          <img
                            src={selectedCollection.image}
                            alt="collection avatar"
                          />
                          <p>{selectedCollection.name}</p>
                        </div>
                      )}
                    </label>
                  );
                })
              ) : (
                <p>
                  You don't have any collection.
                  <Link to="/create-collection">Create a collection!</Link>
                </p>
              )}
            </div>

            <div className="form">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component={"span"} />
            </div>
            <div className="form">
              <label htmlFor="description">Description</label>
              <Field name="description" type="text" as="textarea" />
              <ErrorMessage name="description" component={"span"} />
            </div>
            <div className="form">
              <label htmlFor="category">Category</label>
              <Field name="category" type="text" />
              <ErrorMessage name="category" component={"span"} />
            </div>
            <div className="form">
              <label htmlFor="tags">Tags</label>
              <Field name="tags" type="text" />
              <ErrorMessage name="tags" component={"span"} />
            </div>
            <div className="form">
              <label htmlFor="price">Price</label>
              <Field name="price" type="number" />
              <ErrorMessage name="price" component={"span"} />
            </div>
            <div className="form">
              <label htmlFor="endingOn">Ending On</label>
              <Field name="endingOn" type="date" />
              <ErrorMessage name="endingOn" component={"span"} />
            </div>
            <button type="submit">Create</button>
          </Form>
        </Formik>
        <Toaster position="bottom-right" />
      </div>
    </section>
  );
}

export default CreateNFT;
