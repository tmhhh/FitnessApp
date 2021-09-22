import { FastField, Form, Formik } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import InputField from "../Common/InputField";
import RatingForm from "../Common/RatingForm";
import * as yup from "yup";
import reviewApi from "../../api/reviewApi";

const initialValues = {
  content: "",
  rating: "",
};
const validationSchema = yup.object().shape({
  content: yup.string().required(),
  rating: yup.number().required(),
});

export default function FormReview({ productId }) {
  const handleSubmit = async (formData) => {
    formData = { ...formData, productId };
    await reviewApi.addReview(formData);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          return (
            <Form>
              <FastField
                asType="textarea"
                name="content"
                label="Review Content"
                placeholder="Please input your feedback "
                component={InputField}
              />
              <FastField
                name="rating"
                label="Review Rating"
                component={RatingForm}
              />
              <Button variant="outline-dark" type="submit">
                Send 💬
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
