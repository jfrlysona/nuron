import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.scss";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        }),
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
    <section id="signUp">
      <div className="signUp-container">
        <div className="signUp-content">
          <h2>Sign Up</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              repassword: "",
              toggle: false,
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
              password: Yup.string()
                .min(8, "Must be 8 characters at least")
                .required("Required"),
              repassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
              toggle: Yup.boolean().oneOf([true], "You must allow all terms"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(false);
              handleSubmit(values, { resetForm });
            }}
          >
            <Form>
              <div className="form">
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" id="firstName" type="text" />
                <ErrorMessage name="firstName" component="span" />
              </div>

              <div className="form">
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" id="lastName" type="text" />
                <ErrorMessage name="lastName" component="span" />
              </div>

              <div className="form">
                <label htmlFor="email">Email Address</label>
                <Field name="email" id="email" type="email" />
                <ErrorMessage name="email" component="span" />
              </div>

              <div className="form">
                <label htmlFor="password">Create Password</label>
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
                <ErrorMessage name="password" component="span" />
              </div>

              <div className="form">
                <label htmlFor="repassword">Repeat Password</label>
                <Field
                  name="repassword"
                  id="repassword"
                  type={showPassword ? "text" : "password"}
                />
                <ErrorMessage name="repassword" component="span" />
              </div>

              <div className="checkbox">
                <div className="checkbox-input">
                  <Field type="checkbox" name="toggle" id="toggle" />
                  <label htmlFor="toggle">
                    Allow to all <Link to={"/terms"}>Terms</Link>
                  </label>
                </div>
                <ErrorMessage name="toggle" component={"span"} />
              </div>
              <button type="submit">Sign Up</button>
            </Form>
          </Formik>
          <div className="haveAcc">
            {error && <span>{error}</span>}
            <p>
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
