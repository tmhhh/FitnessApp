import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";

import Select from "react-select";

export default function SelectField(props) {
  const {
    fieldType = 2, // CHOOSE VARIOUS TYPE
    isMulti,
    placeholder,
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

  const handleOnChange = (value) => {
    console.log({ value });
    // const selectedValue = isMulti ? value : value.value;
    onChange({ target: { name, value } });
  };
  let body = null;
  if (fieldType === 0) {
    body = (
      <>
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
            {optionDefaultName ? optionDefaultName : "Open this select menu"}
          </option>
          {options.map((e, index) => (
            <option key={index} value={e.value}>
              {e.name}
            </option>
          ))}
        </Form.Select>
      </>
    );
  } else if (fieldType === 1) {
    body = (
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
            {optionDefaultName ? optionDefaultName : "Open this select menu"}
          </option>
          {options.map((e, index) => (
            <option key={index} value={e.value}>
              {e.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
    );
  } else {
    body = (
      <Select
        {...field}
        onChange={handleOnChange}
        placeholder={placeholder}
        styles={{
          placeholder: (defaultStyles) => {
            return {
              ...defaultStyles,
              fontSize: "1.3rem",
            };
          },
          option: (provided, state) => ({
            ...provided,
            fontSize: "1.3rem",
          }),
          singleValue: (defaultStyles) => {
            return { ...defaultStyles, fontSize: "1.3rem" };
          },
          multiValue: (defaultStyles) => {
            return { ...defaultStyles, fontSize: "1.3rem" };
          },
        }}
        isMulti={isMulti}
        options={options}
      />
    );
  }

  return (
    <>
      <Form.Group
        className={`mb-4 ${type === "number" && "d-flex align-items-center "}`}
      >
        {body}
        <Form.Control.Feedback type="invalid">
          {errors[name]} 💢
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
