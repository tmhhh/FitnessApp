import React from "react";
import { Form } from "react-bootstrap";

export default function RatingForm(props) {
  const { field, form } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const error = errors[name];
  return (
    <>
      <Form.Group>
        <div>
          {[...Array(5)].map((_, index) => (
            <>
              <input
                key={`star-${index}`}
                className={`star star-${5 - index}`}
                id={`star-${5 - index}`}
                type="radio"
                name={name}
                value={5 - index}
                onChange={onChange}
              />{" "}
              <label
                className={`star star-${5 - index}`}
                htmlFor={`star-${5 - index}`}
              ></label>{" "}
            </>
          ))}
        </div>
        {error && (
          <Form.Text style={{ color: "red" }}>
            Please give us your satisfaction level 🙄
          </Form.Text>
        )}
      </Form.Group>
    </>
  );
}
