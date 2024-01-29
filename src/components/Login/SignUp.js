import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

function SIgnUp() {
  const history = useNavigate();
  // Define validation schema
  const navigateToSignUP = () => {
    history("/sign-up");
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Define initial values
  const initialValues = {
    email: "",
    password: "",
  };
  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values", values);
    // You can perform your login logic here

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // const user = userCredential.user;
        history("/");
        // console.log("userCre", userCredential);
      })
      .catch((e) => {
        console.log("error", e.code, e.message);
      });
  };

  return (
    <div>
      <h2>Sign Screen</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <div onClick={navigateToSignUP()}>
        <h1>dont have account please do Sign up</h1>
      </div>
    </div>
  );
}
export default SIgnUp;
