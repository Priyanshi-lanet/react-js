import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.css";
const Login = () => {
  const history = useNavigate();

  const navigateToSignUp = () => {
    history("/sign-up", {
      replace: true,
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        history("/all-meetup");
        console.log("userCredential", userCredential);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Log In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-sm">
              <Field
                className="login-input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
              <div className="error-message">
                <ErrorMessage name="email" />
              </div>
              <Field
                className="login-input"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
              />
              <div className="error-message">
                <ErrorMessage name="password" />
              </div>
              <button
                className="login-button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loging in..." : "Log In"}
              </button>
              <div className="signup-link" onClick={navigateToSignUp}>
                Don't have an account? <a href="/sign-up">Sign Up</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
