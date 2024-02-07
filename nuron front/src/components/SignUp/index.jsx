import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function SignUp() {
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
                <ErrorMessage name="firstName" component="span" />
              </div>

              <div className="form">
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" component="span" />
              </div>

              <div className="form">
                <label htmlFor="email">Email Address</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="span" />
              </div>

              <div className="form">
                <label htmlFor="password">Create Password</label>
                <div className="password-input">
                  <Field name="password" type="password" />
                  {/* <i className="fa-sharp fa-light fa-eye-slash"></i> */}
                  <i className="fa-sharp fa-light fa-eye"></i>
                </div>
                <ErrorMessage name="password" component="span" />
              </div>

              <div className="form">
                <label htmlFor="repassword">Repeat Password</label>
                <div className="password-input">
                  <Field name="repassword" type="password" />
                  {/* <i className="fa-sharp fa-light fa-eye-slash"></i> */}
                  <i className="fa-sharp fa-light fa-eye"></i>
                </div>
                <ErrorMessage name="repassword" component="span" />
              </div>
              <div className="checkbox">
                <Field type="checkbox" name="toggle" />
                Allow to all <Link to={"/terms"}>terms</Link> 
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
