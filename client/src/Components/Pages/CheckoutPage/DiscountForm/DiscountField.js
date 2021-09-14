import React from "react";
import { Form } from "react-bootstrap";

export default function DiscountField(props) {
  const { field, form, type, placeholder, className, disabled } = props;
  const { value, name, onChange, onBlur } = field;
  const { errors, touched } = form;
  return (
    <>
      <Form.Control
        {...field}
        id={name}
        type={type}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        isValid={touched[name] && !errors[name]}
        isInvalid={errors[name] && true}
      />
    </>
  );
}
