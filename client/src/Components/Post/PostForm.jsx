import { FastField, Form, Formik } from "formik";
import React from "react";
import { Image } from "react-bootstrap";
import InputField from "../Common/InputField";
import RichTextField from "../Common/RichTextField";
import { fetchPostImage } from "../../assets/constants";

export default function PostForm({ innerRef, handleSubmit, initialValues }) {
  const onSubmit = async (formData) => {
    let postData = new FormData();
    for (let key in formData) {
      if (formData[key]) postData.append(key, formData[key]);
    }
    await handleSubmit(postData);
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        innerRef={innerRef}
        onSubmit={(values) => onSubmit(values)}
      >
        {(formikProps) => {
          const { values } = formikProps;
          return (
            <Form>
              <FastField name="title" label="Title" component={InputField} />
              <FastField
                name="hashtag"
                label="#Hashtag"
                component={InputField}
              />
              <FastField
                name="thumbnail"
                label="Post thumbnail"
                type="file"
                fieldType={0}
                component={InputField}
              />

              <div className="d-flex justify-content-center">
                {values.thumbnailFile === undefined ? (
                  <Image
                    style={{ width: "600px", height: "300px" }}
                    src={fetchPostImage(values.thumbnail)}
                    thumbnail
                    rounded
                  />
                ) : (
                  <Image
                    style={{ width: "600px", height: "300px" }}
                    src={
                      values.thumbnailFile &&
                      URL.createObjectURL(values.thumbnailFile)
                    }
                    thumbnail
                    rounded
                  />
                )}
              </div>

              <FastField
                name="content"
                label="Content"
                required
                component={RichTextField}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
