import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { Link } from "react-router-dom";
function Login() {
  return (
    <section id="login">
      <div className="login-container">
        <div className="login-content">
          <h2>Log In</h2>
          <Formik
            initialValues={{ password: "", email: "" }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(8, "Must be 8 characters at least")
                .required("Required"),
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
                <Field name="email" type="email" />
                <ErrorMessage name="email" component={"span"} />
              </div>

              <div className="form">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <Field name="password" type="password" />
                  {/* <i className="fa-sharp fa-light fa-eye-slash"></i> */}
                  <i className="fa-sharp fa-light fa-eye"></i>
                </div>
                <ErrorMessage name="password" component={"span"} />
              </div>

              <div className="text-login">
                <div className="checkbox">
                  <Field type="checkbox" name="toggle" /> Remember me
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
