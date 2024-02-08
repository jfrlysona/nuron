import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeProvider";
import "./index.scss";

function ResetPassword() {
  const { theme } = useContext(ThemeContext);

  return (
    <section id="reset">
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
            initialValues={{ email: "", toggle: false }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              toggle: Yup.boolean().oneOf(
                [true],
                "You must agree to the privacy policy"
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
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
          <p>Note: We will send a password to your email</p>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
