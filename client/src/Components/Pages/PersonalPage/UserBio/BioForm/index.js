import React from "react";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../Common/InputField";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";

export default function BioForm({
  userName,
  userEmail,
  userPhone,
  updatedProfile,
}) {
  //
  const dispatch = useDispatch();

  //
  const validationSchema = yup.object().shape({
    userName: yup.string().required("Require"),
    userEmail: yup
      .string()
      .email("Email is not in valid format")
      .required("Require"),
    userPhone: yup.number().min(10).required("Require"),
  });

  //

  return (
    <Formik
      initialValues={{
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => updatedProfile(values)}
    >
      {(formikProps) => {
        return (
          <Form style={{ marginTop: "40px" }} className="position-relative ">
            <FastField
              name="userName"
              label="Your name"
              placeholder="Ex: Truong Hoang ..."
              className="w-50 "
              required
              component={InputField}
            />
            <FastField
              fieldType={1}
              name="userEmail"
              label="Your email"
              className="w-50 "
              placeholder="Ex: example@gmail.com"
              required
              component={InputField}
            />
            <FastField
              name="userPhone"
              className="w-50  "
              label="Your phone number"
              placeholder="Ex: xxx xxx xxx"
              required
              component={InputField}
            />

            <button
              style={{ position: "absolute", right: "50%" }}
              type="submit"
              className="common-button common-button-blue"
            >
              Save Changes
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
