import React from "react";
import { Form } from "react-bootstrap";

export default function InputField(props) {
  const {
    field, // formik
    form, // formik
    type,
    label,
    placeholder,
    disabled,
    required,
    defaultValue,
    min,
    asType,
    multiple,
  } = props;
  const { name, value, onChange, onBlur } = field;
  const { setFieldValue } = form;
  const onFileChange = (e) => {
    const files = e.target.files;
    const file = files.length > 1 ? files : files[0];
    setFieldValue(`${name}File`, file);
  };
  const { errors, touched } = form;
  const error = errors[name] && touched[name];

  return (
    <>
      <Form.Group className="mb-4 mt-4">
        <div className={`${type === "number" && "d-flex align-items-center "}`}>
          {label && (
            <Form.Label
              className={type === "number" && "flex-shrink-0"}
              htmlFor={name}
            >
              {label}
              {required && " * "} :
            </Form.Label>
          )}
          <Form.Control
            {...field}
            onChange={type === "file" ? onFileChange : onChange}
            value={
              type !== "file"
                ? value
                : value instanceof File
                ? value
                : undefined
            }
            id={name}
            as={asType}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
            min={min}
            className={type === "number" && "flex-grow-1 ms-2"}
            multiple={multiple}
            isValid={touched[name] && !errors[name]}
            isInvalid={error}
          />
        </div>
        {error ? (
          <Form.Text
            style={{ color: "red", textAlign: "right", display: "block" }}
          >
            {errors[name]} 💢
          </Form.Text>
        ) : null}
      </Form.Group>
    </>
  );
}
