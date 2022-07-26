import { FastField, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { fetchProductImage } from "../../assets/constants";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import Thumbnail from "../Common/Thumbnail";

export default function NewItemForm(props) {
  const { innerRef, onSubmit, initialValues, validationSchema, action } = props;
  const listCate = useSelector((state) => state.cateReducer);
  return (
    <>
      <Formik
        initialValues={
          action === "update"
            ? {
                ...initialValues,
                prodCategory: initialValues.prodCategory.cateName._id,
                prodCateFilter: initialValues.prodCategory.cateFilter._id,
              }
            : { initialValues }
        }
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
                    placeholder="Price"
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
                options={listCate.map((e) => ({
                  name: e.cateName,
                  value: e._id,
                }))}
                component={SelectField}
              />
              {values.prodCategory && (
                <FastField
                  fieldType={0}
                  name="prodCateFilter"
                  label="Filter"
                  options={listCate
                    .find(
                      (e) => e._id.toString() === values.prodCategory.toString()
                    )
                    .cateFilter.map((ele) => ({
                      name: ele.filterName,
                      value: ele._id,
                    }))}
                  component={SelectField}
                />
              )}

              <FastField
                fieldType={0}
                asType="textarea"
                name="prodDescription"
                label="Product description"
                placeholder="Description"
                component={InputField}
              />
              <FastField
                fieldType={0}
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
