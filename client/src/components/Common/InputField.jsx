import React from "react";
import { Form } from "react-bootstrap";
import "./style.scss";
export default function InputField(props) {
  const {
    fieldType = 1,
    field, // formik
    form, // formik
    type,
    label,
    placeholder,
    disabled,
    required,
    defaultValue,
    className,
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

  let body;
  if (fieldType === 0) {
    body = (
      <Form.Group className="mb-4">
        <div className={`${type === "number" && "d-flex align-items-center "}`}>
          {label && (
            <Form.Label
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "#999",
              }}
              className={type === "number" && "flex-shrink-0"}
              htmlFor={name}
            >
              {label}
              {required && " * "} :
            </Form.Label>
          )}
          <Form.Control
            {...field}
            id={name}
            onChange={type === "file" ? onFileChange : onChange}
            value={
              type !== "file"
                ? value
                : value instanceof File
                ? value
                : undefined
            }
            as={asType}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
            min={min}
            className={type === "number" ? "flex-grow-1 ms-2" : className}
            multiple={multiple}
            isValid={touched[name] && !errors[name]}
            isInvalid={error}
          />
        </div>
        {error ? (
          <Form.Control.Feedback type="invalid">
            {errors[name]}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
    );
  } else if (fieldType === 1) {
    body = (
      <div
        style={{ marginBottom: "15px" }}
        className={className ? className + "custom__input " : "custom__input "}
      >
        <input
          className={`
    ${
      touched[name] && !errors[name]
        ? "is-valid input__field "
        : "input__field "
    }  ${error ? "is-invalid input__field " : ""}`}
          {...field}
          // className="input__field is-invalid"
          name={name}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        <span className="input__state-icon"> </span>
        {label && <p className="input__label">{label}</p>}
        {error ? (
          <Form.Control.Feedback type="invalid">
            {errors[name]}
          </Form.Control.Feedback>
        ) : null}
      </div>
    );
  } else {
    body = (
      <Form.Group className="mb-3">
        {label && (
          <Form.Label
            style={{
              fontSize: "1.5rem",
              fontWeight: "500",
              color: "#999",
            }}
          >
            {label}
          </Form.Label>
        )}
        <Form.Control
          {...field}
          as="textarea"
          rows={3}
          placeholder={placeholder}
          isInvalid={error}
          isValid={touched[name] && !errors[name]}
        />
        {error ? (
          <Form.Control.Feedback type="invalid">
            {errors[name]}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
    );
  }

  return <>{body}</>;
}
