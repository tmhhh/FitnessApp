import React from "react";
import { Form } from "react-bootstrap";

export default function SelectField(props) {
  const {
    field,
    form,
    type,
    label,
    placeholder,
    required,
    defaultValue,
    options,
  } = props;
  const { name, onBlur } = field;
  const { errors, touched } = form;
  const error = errors[name] && touched[name];

  //HANDLE ON BLUR
  const handleOnBlur = (e) => {
    console.log(e);
    const even = {
      target: {
        name,
        touched: e,
      },
    };
    onBlur(even);
  };
  return (
    <>
      <Form.Group
        className={`mb-4 mt-4 ${
          type === "number" && "d-flex align-items-center "
        }`}
      >
        {label && (
          <Form.Label>
            {label}
            {required && " * "} :
          </Form.Label>
        )}
        <Form.Select
          {...field}
          // onBlur={() => console.log("blur")}
          defaultValue={defaultValue}
          isValid={!errors[name] && touched[name]}
          isInvalid={error}
          placeholder={placeholder}
        >
          <option value="">Open this select menu</option>
          {options.map((e) => (
            <option key={e._id} value={e._id}>
              {e.cateType}
            </option>
          ))}
        </Form.Select>
        {error && (
          <Form.Control.Feedback style={{ textAlign: "right" }} type="invalid">
            {errors[name]} 💢
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </>
  );
}
