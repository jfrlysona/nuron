import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../context/UserProvider";
import toast, { Toaster } from "react-hot-toast";
const successToast = () => toast.success("Changes are saved!");
const errorToast = () => toast.error("Changes are not saved!");
import "./index.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
function Settings() {
  const [openImages, setOpenImages] = useState(true);
  const [openInformation, setOpenInformation] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { decode, token, user, setUser } = useContext(UserContext);
  const [orderConfirmationNotice, setOrderConfirmationNotice] = useLocalStorage(
    "orderConfirmationNotice",
    true
  );
  const [newItemsNotification, setNewItemsNotification] = useLocalStorage(
    "newItemsNotification",
    true
  );
  const [newBidNotification, setNewBidNotification] = useLocalStorage(
    "newBidNotification",
    true
  );
  const [paymentCardNotification, setPaymentCardNotification] = useLocalStorage(
    "paymentCardNotification",
    true
  );
  const [endingBidNotification, setEndingBidNotification] = useLocalStorage(
    "endingBidNotification",
    true
  );
  const [productApprovalNotification, setProductApprovalNotification] =
    useLocalStorage("productApprovalNotification", true);
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const avatarInput = useRef();
  const bannerInput = useRef();
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
      successToast();
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      errorToast();
    }
  };

  const handleChangeInfo = async (values) => {
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
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            bio: values.bio,
            role: values.role,
            gender: values.gender,
            phone: values.phone,
            location: values.location,
            address: values.address,
            currency: values.currency,
          }),
        }
      );
      const data = await response.json();
      setUser(data);
      successToast();
    } catch (error) {
      console.log(error.message);
      errorToast();
    }
  };
  const handleSaveOptions = () => {
    successToast();
  };
  const changeAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await fetch(
        "http://localhost:3000/user/" + decode.userId,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      setUser(data);
      successToast();
    } catch (error) {
      console.error("Error changing avatar:", error);
      errorToast();
    }
  };

  const changeBanner = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("banner", banner);

    try {
      const response = await fetch(
        "http://localhost:3000/user/" + decode.userId,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      setUser(data);
      successToast();
    } catch (error) {
      console.error("Error changing avatar:", error);
      errorToast();
    }
  };

  return (
    <section id="settings">
      <div className="container">
        <div className="title">
          <h1>Profile Settings</h1>
          <Link to="/my-profile">
            <i className="fa-light fa-arrow-right-long"></i>
          </Link>
        </div>
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
                className="fa-light fa-bell"
                style={openNotification ? { color: "white" } : null}
              ></i>
              Notification Setting
            </button>
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setAvatar(e.target.files[0])}
            ref={avatarInput}
          />

          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setBanner(e.target.files[0])}
            ref={bannerInput}
          />
          {openImages && (
            <div className="tab-content change-image">
              <div className="avatar">
                <h3>Change Your Profile Picture</h3>
                <div className="img">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="avatar" />
                  ) : (
                    <i className="fa-duotone fa-cloud-arrow-up"></i>
                  )}
                </div>
                <div className="btns">
                  <button
                    className="change-btn"
                    onClick={(e) => avatarInput.current.click(e)}
                  >
                    Change
                  </button>
                  <button className="save-btn" onClick={(e) => changeAvatar(e)}>
                    Save
                  </button>
                  <Toaster position="bottom-right" />
                </div>
              </div>
              <div className="banner">
                <h3>Change Your Banner Image</h3>
                <div className="img">
                  {user.bannerImage ? (
                    <img src={user.bannerImage} alt="avatar" />
                  ) : (
                    <i className="fa-duotone fa-cloud-arrow-up"></i>
                  )}
                </div>
                <div className="btns">
                  <button
                    className="change-btn"
                    onClick={() => bannerInput.current.click()}
                  >
                    Change
                  </button>
                  <button className="save-btn" onClick={(e) => changeBanner(e)}>
                    Save
                  </button>
                  <Toaster position="bottom-right" />
                </div>
              </div>
            </div>
          )}
          {openInformation && (
            <div className="tab-content change-info">
              <Formik
                initialValues={{
                  firstName: user?.firstName || "",
                  lastName: user?.lastName || "",
                  email: user?.email || "",
                  bio: user?.bio || "",
                  role: user?.role || "",
                  gender: user?.gender || "",
                  phone: user?.phone || "",
                  location: user?.location || "",
                  address: user?.address || "",
                  currency: user?.currency || "",
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
                  setSubmitting(false);
                  handleChangeInfo(values);
                }}
              >
                <Form>
                  <div className="line">
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
                  <div className="line">
                    <div className="form">
                      <label htmlFor="role">Your Role</label>
                      <Field name="role" type="text" readOnly />
                      <ErrorMessage name="role" component={"span"} />
                    </div>
                    <div className="form">
                      <label htmlFor="gender">Your Gender</label>
                      <Field name="gender" type="text" />
                      <ErrorMessage name="gender" component={"span"} />
                    </div>
                  </div>
                  <div className="line">
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
                  </div>
                  <div className="line">
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
                  </div>
                  <button type="submit">Save</button>
                </Form>
              </Formik>
              <Toaster position="bottom-right" />
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
                <Toaster position="bottom-right" />
                {error && <p>{error}</p>}
              </div>
            </div>
          )}
          {openNotification && (
            <div className="tab-content change-notification">
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
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={orderConfirmationNotice}
                      onChange={(e) =>
                        setOrderConfirmationNotice(e.target.checked)
                      }
                    />
                  }
                  label="Order Confirmation Notice"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={newItemsNotification}
                      onChange={(e) =>
                        setNewItemsNotification(e.target.checked)
                      }
                    />
                  }
                  label="New Items Notification"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={newBidNotification}
                      onChange={(e) => setNewBidNotification(e.target.checked)}
                    />
                  }
                  label="New Bid Notification"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={paymentCardNotification}
                      onChange={(e) =>
                        setPaymentCardNotification(e.target.checked)
                      }
                    />
                  }
                  label="Payment Card Notification"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={endingBidNotification}
                      onChange={(e) =>
                        setEndingBidNotification(e.target.checked)
                      }
                    />
                  }
                  label="Ending Bid Notification Before 5 min"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={productApprovalNotification}
                      onChange={(e) =>
                        setProductApprovalNotification(e.target.checked)
                      }
                    />
                  }
                  label="Notification for approving product"
                />
              </FormGroup>
              <button onClick={handleSaveOptions}>Save</button>
              <Toaster position="bottom-right" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Settings;
