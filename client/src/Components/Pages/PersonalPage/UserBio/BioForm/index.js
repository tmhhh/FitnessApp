import React from "react";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../Common/InputField";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import authSlice from "../../../../../redux/slices/authSlice";
import * as yup from "yup";
import userApi from "../../../../../api/userApi";
export default function BioForm({ userName, userEmail, userPhone }) {
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
  const updatedProfile = async (values) => {
    try {
      const data = { ...values };
      delete data.userConfirmPassword;
      const res = await userApi.updateProfile(data);
      if (res.data.isSuccess)
        return dispatch(authSlice.actions.setUserProfile(res.data.updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
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
          <Form>
            <FastField
              name="userName"
              label="Your name"
              placeholder="Input your name"
              className="w-50 "
              required
              component={InputField}
            />
            <FastField
              name="userEmail"
              label="Your email"
              className="w-50 "
              placeholder="Input your email"
              required
              component={InputField}
            />
            <FastField
              name="userPhone"
              className="w-50 "
              label="Your phone number"
              placeholder="Input your phone number"
              required
              component={InputField}
            />

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}