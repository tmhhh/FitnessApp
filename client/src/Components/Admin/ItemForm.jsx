import { FastField, Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";

export default function NewItemForm(props) {
  const { innerRef, onSubmit, initialValues, validationSchema } = props;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validationSchema}
        innerRef={innerRef}
      >
        {(formikProps) => {
          return (
            <Form>
              <FastField
                name="name"
                label="Product name"
                placeholder="Input the product's name"
                required
                component={InputField}
              />
              <Row>
                <Col>
                  {" "}
                  <FastField
                    name="price"
                    label="Price"
                    placeholder=" Price"
                    type="number"
                    required
                    component={InputField}
                  />
                </Col>
                <Col>
                  {" "}
                  <FastField
                    name="quantity"
                    label="Quantity"
                    placeholder="Quantity"
                    min={1}
                    type="number"
                    required
                    component={InputField}
                  />
                </Col>
              </Row>
              <FastField
                name="category"
                label="Category"
                component={SelectField}
              />
              <FastField
                asType="textarea"
                name="description"
                label="Product description"
                placeholder="Description"
                component={InputField}
              />
              <FastField
                name="thumbnail"
                label="Product thumbnail"
                type="file"
                component={InputField}
              />
              <FastField
                name="images"
                label="Product Images"
                type="file"
                multiple
                component={InputField}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
