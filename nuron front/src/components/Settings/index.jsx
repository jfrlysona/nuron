import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { UserContext } from "../../context/UserProvider";
import "./index.scss";
import { useNavigate } from "react-router-dom";
function Settings() {
  const [openImages, setOpenImages] = useState(true);
  const [openInformation, setOpenInformation] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { decode } = useContext(UserContext);

  const handleResetPassword = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      resetForm();
      setError(null);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };
  return (
    <section id="settings">
      <div className="container">
        <h1>Profile Settings</h1>
        <div className="content">
          <div className="tabs">
            <button
              style={
                openImages
                  ? {
                      backgroundColor: "var(--btn-selected-color)",
                      border: "1px solid transparent",
                      color: "white",
                    }
                  : null
              }
              onClick={() => {
                setOpenImages(true);
                setOpenInformation(false);
                setOpenChangePassword(false);
                setOpenNotification(false);
              }}
            >
              <i
                style={openImages ? { color: "white" } : null}
                className="fa-light fa-pen-to-square"
              ></i>
              Edit Profile Image
            </button>
            <button
              style={
                openInformation
                  ? {
                      backgroundColor: "var(--btn-selected-color)",
                      border: "1px solid transparent",
                      color: "white",
                    }
                  : null
              }
              onClick={() => {
                setOpenImages(false);
                setOpenInformation(true);
                setOpenChangePassword(false);
                setOpenNotification(false);
              }}
            >
              <i
                className="fa-light fa-user"
                style={openInformation ? { color: "white" } : null}
              ></i>
              Personal Information
            </button>
            <button
              onClick={() => {
                setOpenImages(false);
                setOpenInformation(false);
                setOpenChangePassword(true);
                setOpenNotification(false);
              }}
              style={
                openChangePassword
                  ? {
                      backgroundColor: "var(--btn-selected-color)",
                      border: "1px solid transparent",
                      color: "white",
                    }
                  : null
              }
            >
              <i
                className="fa-light fa-lock"
                style={openChangePassword ? { color: "white" } : null}
              ></i>
              Change Password
            </button>
            <button
              onClick={() => {
                setOpenImages(false);
                setOpenInformation(false);
                setOpenChangePassword(false);
                setOpenNotification(true);
              }}
              style={
                openNotification
                  ? {
                      backgroundColor: "var(--btn-selected-color)",
                      border: "1px solid transparent",
                      color: "white",
                    }
                  : null
              }
            >
              <i
                class="fa-light fa-bell"
                style={openNotification ? { color: "white" } : null}
              ></i>
              Notification Setting
            </button>
          </div>
          {openImages && (
            <div className="tab-content change-image">
              <div className="avatar">
                <h3>Change Your Profile Picture</h3>
                <div className="img">
                  <img
                    src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fprofile%2Fprofile-01.jpg&w=1920&q=75"
                    alt=""
                  />
                </div>
                <button>Upload Profile</button>
              </div>
              <div className="banner">
                <h3>Change Your Banner Image</h3>
                <div className="img">
                  <img
                    src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fprofile%2Fcover-01.jpg&w=1920&q=75"
                    alt=""
                  />
                </div>
                <button>Upload Banner</button>
              </div>
            </div>
          )}
          {openInformation && (
            <div className="tab-content change-info">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  bio: "",
                  role: "",
                  gender: "",
                  phone: 0,
                  location: "",
                  address: "",
                  currency: "",
                }}
                validationSchema={Yup.object({
                  firstName: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                  lastName: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                <Form>
                  <div className="form">
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" />
                    <ErrorMessage name="firstName" component={"span"} />
                  </div>
                  <div className="form">
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" />
                    <ErrorMessage name="lastName" component={"span"} />
                  </div>
                  <div className="form">
                    <label htmlFor="email">Email Address</label>
                    <Field name="email" type="email" />
                    <ErrorMessage name="email" component={"span"} />
                  </div>
                  <div className="form">
                    <label htmlFor="bio">Edit Your Bio</label>
                    <Field name="bio" type="text" as="textarea" />
                    <ErrorMessage name="bio" component={"span"} />
                  </div>
                  <div className="form">
                    <label htmlFor="role">Your Role</label>
                    <Field name="role" type="text" />
                    <ErrorMessage name="role" component={"span"} />
                  </div>
                  <div className="form">
                    <label htmlFor="role">Your Gender</label>
                    <Field name="role" type="text" />
                    <ErrorMessage name="role" component={"span"} />
                  </div>
                  <div className="form">
                    <label htmlFor="currency">Currency</label>
                    <Field name="currency" type="text" />
                    <ErrorMessage name="currency" component={"span"} />
                  </div>
                  <div className="form">
                    <label htmlFor="phone">Phone Number</label>
                    <Field name="phone" type="text" />
                    <ErrorMessage name="phone" component={"span"} />
                  </div>
                  <div className="form">
                    <label htmlFor="location">Location</label>
                    <Field name="location" type="text" />
                    <ErrorMessage name="location" component={"span"} />
                  </div>
                  <div className="form">
                    <label htmlFor="address">Address</label>
                    <Field name="address" type="text" />
                    <ErrorMessage name="address" component={"span"} />
                  </div>
                  <button type="submit">Save</button>
                </Form>
              </Formik>
            </div>
          )}
          {openChangePassword && (
            <div className="tab-content change-password">
              <div className="text">
                <h2>Create Your Password</h2>
                <p>
                  Passwords are a critical part of information and network
                  security. Passwords serve to protect user accounts but a
                  poorly chosen password, if compromised, could put the entire
                  network at risk.
                </p>
              </div>
              <div className="reset-content">
                <Formik
                  initialValues={{ email: decode?.email, password: "" }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Required"),
                    password: Yup.string()
                      .min(8, "Must be 8 characters at least")
                      .required("Required"),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false);
                    handleResetPassword(values, { resetForm });
                  }}
                >
                  <Form>
                    <div className="form">
                      <label htmlFor="email">Enter Email Address</label>
                      <Field name="email" id="email" type="email" readOnly />
                      <ErrorMessage name="email" component={"span"} />
                    </div>
                    <div className="form">
                      <label htmlFor="password">Create New Password</label>
                      <div className="password-input">
                        <Field
                          name="password"
                          id="password"
                          type={showPassword ? "text" : "password"}
                        />
                        {showPassword ? (
                          <i
                            className="fa-sharp fa-light fa-eye-slash"
                            onClick={() => setShowPassword(false)}
                          ></i>
                        ) : (
                          <i
                            className="fa-sharp fa-light fa-eye"
                            onClick={() => setShowPassword(true)}
                          ></i>
                        )}
                      </div>
                      <ErrorMessage name="password" component={"span"} />
                    </div>
                    <button type="submit">Save</button>
                  </Form>
                </Formik>
                {error && <p>{error}</p>}
              </div>
            </div>
          )}
          {openNotification && (
            <div className="tab-content ">
              <div className="text">
                <h2>Make Sure Your Notification setting</h2>
                <p>
                  Notification Center is where you can find app notifications
                  and Quick Settings—which give you quick access to commonly
                  used settings and apps. You can change your notification
                  settings at any time from the Settings app. Select Start ,
                  then select Settings
                </p>
              </div>
              <div className="radio-group">
                <div className="radio">
                  <input type="radio" name="" id="" />
                  <label htmlFor="">Order Confirmation Notice</label>
                </div>
                <div className="radio">
                  <input type="radio" name="" id="" />
                  <label htmlFor="">New Items Notification</label>
                </div>
                <div className="radio">
                  <input type="radio" name="" id="" />
                  <label htmlFor="">New Bid Notification</label>
                </div>
                <div className="radio">
                  <input type="radio" name="" id="" />
                  <label htmlFor="">Payment Card Notification</label>
                </div>
                <div className="radio">
                  <input type="radio" name="" id="" />
                  <label htmlFor="">Ending Bid Notification Before 5 min</label>
                </div>
                <div className="radio">
                  <input type="radio" name="" id="" />
                  <label htmlFor="">Notification for approving product</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Settings;
