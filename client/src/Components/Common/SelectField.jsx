import React from "react";
import { Form } from "react-bootstrap";

export default function SelectField(props) {
  const {
    field,
    form,
    type,
    label,
    disabled,
    required,
    options,
    optionDefaultValue,
  } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const error = errors[name] && touched[name];

  return (
    <>
      <Form.Group
        className={`mb-4 ${type === "number" && "d-flex align-items-center "}`}
      >
        {label && (
          <Form.Label
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "#999",
            }}
          >
            {label}
            {required && " * "} :
          </Form.Label>
        )}
        <Form.Select
          {...field}
          disabled={disabled}
          // defaultValue={defaultValue}
          isValid={touched[name] && !error}
          isInvalid={error}
        >
          <option value={""}>
            {optionDefaultValue ? optionDefaultValue : "Open this select menu"}
          </option>
          {options.map((e, index) => (
            <option key={index} value={e.value}>
              {e.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors[name]} 💢
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
