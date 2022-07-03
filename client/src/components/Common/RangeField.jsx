import React from "react";
import { Form } from "react-bootstrap";
import "./style.scss";
import {Slider} from "antd";
export default function RangeField(props) {
  const {
    fieldType = 1,
    field, // formik
    form, // formik
    type,
    label,
    marks,
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
  const { errors, touched } = form;
  const error = errors[name] && touched[name];

  const handleSliderChange = (value) => {
    onChange({ target: { name, value } })
  }

  return (
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
        <Slider range marks={marks} defaultValue={[26, 37]} onChange={handleSliderChange} />
        {error ? (
            <Form.Control.Feedback type="invalid">
              {errors[name]}
            </Form.Control.Feedback>
        ) : null}
      </Form.Group>
  );
}
