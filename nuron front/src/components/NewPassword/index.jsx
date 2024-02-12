import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeProvider";
import "./index.scss";

function NewPassword() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleResetPassword = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      resetForm();
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section id="newpassword">
      <div className="reset-container">
        <div className="reset-content">
          <img
            src={
              theme === "dark"
                ? "https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Flogo%2Flogo-white.png&w=128&q=75"
                : "https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Flogo%2Flogo-dark.png&w=128&q=75"
            }
            alt="Logo"
          />
          <Formik
            initialValues={{ email: "", password: "", toggle: false }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .min(8, "Must be 8 characters at least")
                .required("Required"),
              toggle: Yup.boolean().oneOf(
                [true],
                "You must agree to the privacy policy"
              ),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(false);
              handleResetPassword(values, { resetForm });
            }}
          >
            <Form>
              <div className="form">
                <label htmlFor="email">Email Address</label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                />
                <ErrorMessage name="email" component={"span"} />
              </div>
              <div className="form">
                <label htmlFor="password">New Password</label>
                <div className="password-input">
                  <Field
                    placeholder="Enter New Password"
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

              <div className="text-login">
                <div className="checkbox">
                  <div className="checkbox-input">
                    <Field type="checkbox" name="toggle" id="toggle" />
                    <label htmlFor="toggle">
                      I agree to the
                      <Link to="/privacy-policy"> privacy policy</Link>
                    </label>
                  </div>
                  <ErrorMessage name="toggle" component={"span"} />
                </div>
              </div>
              <button type="submit">Reset Password</button>
            </Form>
          </Formik>
          {error && <p>{error}</p>}
        </div>
      </div>
    </section>
  );
}

export default NewPassword;
