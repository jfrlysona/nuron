import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function ResetPassword() {
  return (
    <section id="reset">
      <div className="reset-container">
        <div className="reset-content">
          <img
            src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Flogo%2Flogo-white.png&w=128&q=75"
            alt="logo"
          />
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
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
                  type="email"
                  placeholder="Enter Your Email"
                />
                <ErrorMessage name="email" component={"span"} />
              </div>

              <div className="text-login">
                <div className="checkbox">
                  <Field type="checkbox" name="toggle" /> I agree to the{" "}
                  <Link to="/privacy-policy">privacy policy</Link>
                </div>
              </div>
              <button type="submit">Send</button>
            </Form>
          </Formik>
          <p>Note: We will send a password to your email</p>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
