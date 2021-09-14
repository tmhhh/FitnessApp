import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
export default function DatePickerField(props) {
  const { form, field, label, required, minDate } = props;
  const { name, value, onChange } = field;
  const { errors, touched } = form;
  const error = errors[name] && touched[name];

  //HANDLE MANUALLY ON CHANGE
  const handleOnChange = (value) => {
    const changeEvent = {
      target: {
        name,
        value,
      },
    };
    onChange(changeEvent);
  };
  return (
    <>
      <Form.Group
        className="d-flex justify-content-flex-start mb-4 mt-4 flex-wrap"
        controlId="formBasicEmail"
      >
        {label && (
          <Form.Label className="">
            {label}
            {required && "*"} :
          </Form.Label>
        )}
        <DatePicker
          {...field}
          date
          locale="us-uk"
          minDate={minDate}
          calendarType="Arabic"
          onChange={handleOnChange}
          className="flex-grow-1"
          format={"y-MM-dd"}
        />
        {error ? (
          <Form.Text
            style={{
              width: "100%",
              color: "red",
              textAlign: "right",
            }}
          >
            {errors[name]} 💢
          </Form.Text>
        ) : null}
      </Form.Group>
    </>
  );
}
