import { FastField, Form, Formik } from "formik";
import React from "react";
import InputField from "../../../Common/InputField";
import * as yup from "yup";
import { useRef } from "react";

export default function CateForm(props) {
  const { innerRef, handleSubmitAction, action, updatedCateRef } = props;
  const initialValues = {
    cateName: "",
    cateFilter: "",
  };
  const validationSchema = yup.object().shape({
    cateName: yup.string().required("This field is required"),
    cateFilter: yup.string().required("This field is required"),
  });

  ///CAST ARRAY FILTER TO STRING
  let cateFilter = "";
  if (action === "update") {
    updatedCateRef.cateFilter.forEach((e, index) => {
      if (index < updatedCateRef.cateFilter.length - 1)
        return (cateFilter += e.filterName + ", ");
      return (cateFilter += e.filterName);
    });
    console.log({ cateFilter });
    initialValues.cateName = updatedCateRef.cateName;
    initialValues.cateFilter = cateFilter;
  }
  const checkRef = useRef(false);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => handleSubmitAction(values)}
        validationSchema={validationSchema}
        innerRef={innerRef}
      >
        {(formikProps) => {
          return (
            <Form>
              <FastField
                name="cateName"
                label="Cate name"
                placeholder="Input cate type"
                required
                component={InputField}
              />
              <FastField
                name="cateFilter"
                label="Category filter (separate each filter with ',')"
                placeholder="Input category filter"
                type="text"
                required
                component={InputField}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
