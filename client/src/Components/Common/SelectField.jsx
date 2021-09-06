import React from "react";
import { Form } from "react-bootstrap";

export default function SelectField(props) {
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
  } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const error = errors[name] && touched[name];

  return (
    <>
      <Form.Group
        className={`mb-3 ${type === "number" && "d-flex align-items-center "}`}
      >
        {label && (
          <Form.Label>
            {label}
            {required && " * "} :
          </Form.Label>
        )}
        <Form.Select
          {...field}
          defaultValue={defaultValue}
          isValid={touched[name] && !error}
          isInvalid={error}
        >
          <option value={""}>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors[name]} 💢
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
