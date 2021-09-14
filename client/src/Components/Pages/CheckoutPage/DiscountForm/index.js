import React from "react";
import { Formik, Form, FastField } from "formik";
import DiscountField from "./DiscountField";
import * as yup from "yup";

export default function DiscountForm({ handleSubmitVoucher, disabled }) {
  const validationSchema = yup.object().shape({
    vouCode: yup.string().required("Please input your discount code"),
  });

  return (
    <Formik
      initialValues={{
        vouCode: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmitVoucher}
    >
      {(formikProps) => {
        const { values } = formikProps;
        console.log(values);
        return (
          <Form className="d-flex align-items-center">
            <FastField
              className="discount_input"
              name="vouCode"
              component={DiscountField}
              type="text"
              placeholder="Discount Code"
              disabled={disabled}
            />
            <button style={{ marginLeft: "10px" }} type="submit">
              Apply
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
