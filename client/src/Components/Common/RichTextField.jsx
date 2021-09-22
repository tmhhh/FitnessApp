import React from "react";
import { Form } from "react-bootstrap";
import QuillEditor from "./QuillEditor";

export default function RichTextField(props) {
  const { field, form, label, required, placeholder } = props;
  const { name, value } = field;
  const { setFieldValue } = form;
  //   const onFileChange = (e) => {
  //     const files = e.target.files;
  //     const file = files.length > 1 ? files : files[0];
  //     setFieldValue(`${name}File`, file);
  //   };
  const onEditorChange = (values) => {
    setFieldValue(name, values);
  };
  const onFilesChange = () => {};
  const { errors, touched } = form;
  const error = errors[name] && touched[name];
  return (
    <>
      {label && (
        <Form.Label>
          {label}
          {required && " * "} :
        </Form.Label>
      )}
      <QuillEditor
        height="800px"
        value={value}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
        placeholder={placeholder}
      />
      {error && (
        <Form.Text style={{ color: "red" }}>
          Your post can not have no content 👆
        </Form.Text>
      )}
    </>
  );
}
