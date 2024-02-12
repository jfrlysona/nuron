import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./index.scss";
import { AuthContext } from "../../context/AuthProvider";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
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
      console.log("Login successful");
      login();
    } catch (error) {
      setError(error.message);
    }
  };
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
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(false);
              handleSubmit(values, { resetForm });
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
          <div className="haveAcc">
            {error && <span>{error}</span>}
            <p>
              Don't have account? <Link to={"/sign-up"}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
