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

  return (
    <>
      {fieldType === 0 ? (
        <Form.Group className="mb-4">
          <div
            className={`${type === "number" && "d-flex align-items-center "}`}
          >
            {label && (
              <Form.Label
                style={{
                  fontSize: "15px",
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
            <Form.Text
              style={{
                color: "red",
                // textAlign: "right",
                // display: "inline-block",
              }}
            >
              {errors[name]} 💢
            </Form.Text>
          ) : null}
        </Form.Group>
      ) : (
        <div
          class={
            className ? className + "custom__input mt-4" : "custom__input mt-4"
          }
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
            type="text"
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
          <span className="input__state-icon"> </span>
          {label && <p class="input__label">{label}</p>}
          {error ? (
            <div
              style={{
                color: "red",
              }}
            >
              {errors[name]} 💢
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
