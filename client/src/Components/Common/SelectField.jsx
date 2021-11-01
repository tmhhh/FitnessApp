import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";

export default function SelectField(props) {
  const {
    fieldType, // CHOOSE VARIOUS TYPE
    field,
    form,
    type,
    label,
    disabled,
    required,
    options,
    optionDefaultName,
  } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const error = errors[name] && touched[name];

  return (
    <>
      <Form.Group
        className={`mb-4 ${type === "number" && "d-flex align-items-center "}`}
      >
        {fieldType === 0 ? (
          label && (
            <>
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

              <Form.Select
                {...field}
                disabled={disabled}
                // defaultValue={defaultValue}
                isValid={touched[name] && !error}
                isInvalid={error}
              >
                <option value={""}>
                  {optionDefaultName
                    ? optionDefaultName
                    : "Open this select menu"}
                </option>
                {options.map((e, index) => (
                  <option key={index} value={e.value}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </>
          )
        ) : (
          <FloatingLabel
            controlId="floatingSelect"
            label={label && label}
            className={error && "is-invalid"}
          >
            <Form.Select
              {...field}
              disabled={disabled}
              isValid={touched[name] && !error}
              isInvalid={error}
            >
              <option value={""}>
                {optionDefaultName
                  ? optionDefaultName
                  : "Open this select menu"}
              </option>
              {options.map((e, index) => (
                <option key={index} value={e.value}>
                  {e.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        )}
        <Form.Control.Feedback type="invalid">
          {errors[name]} 💢
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
