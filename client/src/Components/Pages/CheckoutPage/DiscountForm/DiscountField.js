import React from "react";
import { Form } from "react-bootstrap";

export default function DiscountField(props) {
  const { field, form, type, placeholder, className, disabled, label } = props;
  const { value, name, onChange, onBlur } = field;
  const { errors, touched } = form;
  return (
    <>
      <Form.Group className={className}>
        {label && (
          <Form.Label
            style={{ fontSize: "15px", fontWeight: "400", color: "#999" }}
          >
            {label}
          </Form.Label>
        )}
        <Form.Control
          {...field}
          id={name}
          type={type}
          // style={{ width: "100%" }}
          placeholder={placeholder}
          disabled={disabled}
          isValid={touched[name] && !errors[name]}
          isInvalid={errors[name] && true}
        />
      </Form.Group>
    </>
  );
}
