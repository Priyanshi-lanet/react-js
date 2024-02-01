import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.css";
import { UserAuth } from "../context/AuthContext";
function SignUp() {
  const { createUser } = UserAuth();
  const history = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createUser(values.email, values.password);
      history("/all-meetup");
    } catch (error) {
      console.log(error);
      alert(error);
    }
    //    // method: 2;  createUserWithEmailAndPassword(auth, values.email, values.password)
    //   .then((userCredential) => {
    //     history("/");
    //   })
    //   .catch((error) => {
    //     console.error("error", error);
    //   });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Sign In</h2>
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
              <div className="password-input-container">
                <Field
                  className="login-input1"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  name="password"
                />
                <button
                  className="toggle-password-button"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <div className="error-message">
                <ErrorMessage name="password" />
              </div>
              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
