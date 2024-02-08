import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section id="login">
      <div className="login-container">
        <div className="login-content">
          <h2>Login</h2>
          <Formik
            initialValues={{ password: "", email: "", toggle: false }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(8, "Must be 8 characters at least")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              toggle: Yup.boolean().oneOf([true], "Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            <Form>
              <div className="form">
                <label htmlFor="email">Email Address</label>
                <Field name="email" type="email" id="email" />
                <ErrorMessage name="email" component={"span"} />
              </div>

              <div className="form">
                <label htmlFor="password">Password</label>
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

              <div className="text-login">
                <div className="checkbox">
                  <div className="checkbox-input">
                    <Field type="checkbox" name="toggle" id="toggle" />
                    <label htmlFor="toggle">Remember me</label>
                  </div>
                  <ErrorMessage name="toggle" component={"span"} />
                </div>
                <Link to="/reset-password">Lost your password?</Link>
              </div>
              <button type="submit">Log In</button>
            </Form>
          </Formik>
          <p className="haveAcc">
            Don't have account? <Link to={"/sign-up"}>Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
