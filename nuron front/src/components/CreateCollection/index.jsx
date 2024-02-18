import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { UserContext } from "../../context/UserProvider";
import "./index.scss";
const successToast = () => toast.success("Collection is created!");
const errorToast = () => toast.error("Collection is not created!");
function CreateCollection() {
  const { user, token } = useContext(UserContext);
  const [collection, setCollection] = useState({});
  const [image, setImage] = useState("");
  const [banner, setBanner] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);
  const imageInput = useRef();
  const bannerInput = useRef();
  const createNewCollection = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("banner", banner);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("createdBy", user._id);

      const response = await fetch("http://localhost:3000/collection/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      setCollection(data);
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

  const changeBanner = (e) => {
    setBanner(e.target.files[0]);
    setPreviewBanner(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <section id="createCollection">
      <div className="container">
        <input
          type="file"
          style={{ display: "none" }}
          onChange={changeImage}
          ref={imageInput}
        />

        <input
          type="file"
          style={{ display: "none" }}
          onChange={changeBanner}
          ref={bannerInput}
        />
        <div className="images">
          {previewBanner ? (
            <>
              <img src={previewBanner} alt="preview" />
              <i
                className="fa-duotone fa-paintbrush"
                onClick={() => bannerInput.current.click()}
              ></i>
            </>
          ) : (
            <i
              className="fa-light fa-upload"
              onClick={() => bannerInput.current.click()}
            ></i>
          )}
          <div className="imageAvatar">
            {previewImage ? (
              <>
                <img src={previewImage} alt="preview" />
                <i
                  class="fa-duotone fa-paintbrush"
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
        </div>
        <Formik
          initialValues={{ name: "", description: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(5, "Must be 5 characters at least")
              .required("Required"),
            description: Yup.string()
              .min(20, "Must be 20 characters at least")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            createNewCollection(values, { resetForm });
          }}
        >
          <Form>
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
            <button type="submit">Create</button>
          </Form>
        </Formik>
        <Toaster position="bottom-right" />
      </div>
    </section>
  );
}

export default CreateCollection;
