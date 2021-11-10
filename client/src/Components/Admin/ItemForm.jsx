import { FastField, Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { fetchProductImage } from "../../assets/constants";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import Thumbnail from "../Common/Thumbnail";

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
          const { values } = formikProps;
          return (
            <Form>
              <FastField
                name="prodName"
                label="Product name"
                placeholder="Input the product's name"
                required
                component={InputField}
              />
              <Row>
                <Col>
                  {" "}
                  <FastField
                    name="prodPrice"
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
                    name="prodQuantity"
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
                fieldType={0}
                name="prodCategory"
                label="Category"
                component={SelectField}
              />
              <FastField
                asType="textarea"
                name="prodDescription"
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

              <div className="d-flex justify-content-center">
                {values.thumbnailFile === undefined ? (
                  <Thumbnail url={fetchProductImage(values.prodThumbnail)} />
                ) : (
                  <Thumbnail
                    url={
                      values.thumbnailFile &&
                      URL.createObjectURL(values.thumbnailFile)
                    }
                  />
                )}
              </div>
              <FastField
                name="images"
                label="Product Images"
                type="file"
                multiple
                component={InputField}
              />
              {values.imagesFile === undefined ? (
                <div className="d-flex justify-content-center">
                  {values.prodImages &&
                    Array.from(values.prodImages).map((url) => (
                      <div key={url}>
                        <Thumbnail url={url} />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  {values.imagesFile &&
                    Array.from(values.imagesFile).map((file) => (
                      <div key={file.name}>
                        <Thumbnail url={URL.createObjectURL(file)} />
                      </div>
                    ))}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
