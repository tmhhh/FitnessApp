import React from "react";
import { Form } from "react-bootstrap";

export default function InputField(props) {
  const {
    field,
    form,
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
      <Form.Group className="mb-3">
        <div className={`${type === "number" && "d-flex align-items-center "}`}>
          {label && (
            <Form.Label>
              {label}
              {required && " * "} :
            </Form.Label>
          )}
          <Form.Control
            {...field}
            onChange={type === "file" ? onFileChange : onChange}
            as={asType}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
            min={min}
            className={type === "number" && "w-50 ms-2"}
            multiple={multiple}
            isValid={touched[name] && !error}
            isInvalid={error}
          />
        </div>
        {error && (
          <Form.Text style={{ color: "red" }}>{errors[name]} 💢</Form.Text>
        )}
      </Form.Group>
    </>
  );
}
