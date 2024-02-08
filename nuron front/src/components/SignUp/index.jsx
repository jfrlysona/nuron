import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.scss";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
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
          <p className="haveAcc">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
