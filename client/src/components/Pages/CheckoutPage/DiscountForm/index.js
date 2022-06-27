import React from "react";
import { Formik, Form, FastField } from "formik";
import DiscountField from "./DiscountField";
import * as yup from "yup";
import { Button } from "react-bootstrap";

export default function DiscountForm({
  handleSubmitVoucher,
  disabled,
  discountFormRef,
}) {
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
      innerRef={discountFormRef}
    >
      {(formikProps) => {
        const { values } = formikProps;
        // console.log(values);
        return (
          <Form className="d-flex align-items-center ">
            <FastField
              label="Add a discount code (optional)"
              className="discount_input flex-grow-1 "
              name="vouCode"
              component={DiscountField}
              type="text"
              placeholder="Discount Code"
              disabled={disabled}
            />
            <button
              className="common-button common-button-green"
              style={{
                alignSelf: "end",
                marginLeft: "10px",
                fontSize: "1.5rem",
              }}
              type="submit"
            >
              Apply
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
