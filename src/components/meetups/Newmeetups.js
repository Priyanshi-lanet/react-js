import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Newmeetups.css";

function Newmeetups(props) {
  const initialValues = {
    title: "",
    image: "",
    address: "",
    description: "",
  };

  const onSubmit = (values, { resetForm }) => {
    props.onAddMeetup(values);
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
    address: Yup.string().required("Address is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="control">
              <label htmlFor="title" style={{ color: "grey" }}>
                Meetup Title
              </label>
              <Field type="text" id="title" name="title" />
              {errors.title && touched.title && <div>{errors.title}</div>}
            </div>
            <div className="control">
              <label htmlFor="image" style={{ color: "grey" }}>
                Meetup Image
              </label>
              <Field type="url" id="image" name="image" />
              {errors.image && touched.image && <div>{errors.image}</div>}
            </div>
            <div className="control">
              <label htmlFor="address" style={{ color: "grey" }}>
                Address
              </label>
              <Field type="text" id="address" name="address" />
              {errors.address && touched.address && <div>{errors.address}</div>}
            </div>
            <div className="control">
              <label htmlFor="description" style={{ color: "grey" }}>
                Description
              </label>
              <Field
                component="textarea"
                id="description"
                name="description"
                rows="5"
              />
              {errors.description && touched.description && (
                <div>{errors.description}</div>
              )}
            </div>

            <div className="actions">
              <button type="submit">Add Meetup</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Newmeetups;
