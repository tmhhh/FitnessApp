import { Form } from "react-bootstrap";

export default function InputField(props) {
  const {
    field, // formik
    form, // formik
    type,
    label,
    subCheckLabel,
    checkLabel,
    required,
  } = props;
  const { name, value, onChange, onBlur } = field;
  const { setFieldValue } = form;

  const { errors, touched } = form;
  const error = errors[name] && touched[name];

  const handleOnChange = (e) => {
    // console.log(e.target.value);
    const changeEvent = {
      target: {
        name,
        value: e.target.value,
      },
    };
    onChange(changeEvent);
  };
  return (
    <>
      <Form.Group className="mb-4 mt-4">
        <div className="d-flex align-items-center ">
          {label && (
            <Form.Label
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "#999",
                marginRight: "20px",
              }}
              className={type === "number" && "flex-shrink-0"}
              htmlFor={name}
            >
              {label}
              {required && " * "} :
            </Form.Label>
          )}
          {checkLabel.map((e, index) => (
            <div className="d-flex flex-column">
              <Form.Check
                key={index}
                {...field}
                id={index}
                checked={value === e ? true : false}
                style={{ minWidth: "100px" }}
                className="d-flex  align-items-center "
                value={e}
                onChange={handleOnChange}
                type={type}
                inline
                label={e}
                isValid={touched[name] && !errors[name]}
                isInvalid={error}
              />
              {subCheckLabel[index]}
            </div>
          ))}
        </div>
        {error ? (
          <Form.Text
            style={{
              color: "red",
            }}
          >
            {errors[name]} 💢
          </Form.Text>
        ) : null}
      </Form.Group>
    </>
  );
}
