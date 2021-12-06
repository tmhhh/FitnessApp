import { FastField, Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { fetchServiceImage } from "../../../assets/constants";
import InputField from "../../Common/InputField";
import Thumbnail from "../../Common/Thumbnail";

export default function ItemForm(props) {
  const { innerRef, onSubmit, initialValues, validationSchema } = props;
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validationSchema}
        innerRef={innerRef}
      >
        {(formikProps) => {
          const { values } = formikProps;
          return (
            <Form>
              <FastField
                name="name"
                label="Service name"
                placeholder="Input the Service's name"
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
                    name="slot"
                    label="Slot"
                    placeholder="Slot"
                    min={1}
                    type="number"
                    required
                    component={InputField}
                  />
                </Col>
              </Row>
              <FastField
                name="vendor"
                label="Service vendor"
                placeholder="Input the Service's Vendor"
                required
                component={InputField}
              />
              <FastField
                asType="textarea"
                name="description"
                label="Service description"
                placeholder="Description"
                fieldType={0}
                component={InputField}
              />
              <FastField
                name="thumbnail"
                label="Service thumbnail"
                type="file"
                fieldType={0}
                component={InputField}
              />

              <div className="d-flex justify-content-center">
                {values.thumbnailFile === undefined ? (
                  <Thumbnail url={fetchServiceImage(values.prodThumbnail)} />
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
                label="Service Images"
                type="file"
                fieldType={0}
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
