import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";
import "./style.scss";

function Register({ setAuthForm, authForm: { isShown } }) {
  const [input, setInput] = useState({
    username: "",
    password: "",
    rePassword: "",
  });

  //
  const handleInputOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //REGISTER
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form
      className={isShown === true ? "auth_form form_active" : "auth_form"}
      onSubmit={handleOnSubmit}
    >
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleInputOnChange}
          type="text"
          name="username"
          value={input.username}
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleInputOnChange}
          type="password"
          name="password"
          value={input.password}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Re-Password</Form.Label>
        <Form.Control
          onChange={handleInputOnChange}
          type="password"
          name="rePassword"
          value={input.rePassword}
          placeholder="Confirm password"
        />
      </Form.Group>

      <div className="form_footer">
        <Form.Text className="text-muted">
          Already have an account ? Login{" "}
          <Link
            onClick={() =>
              setAuthForm({
                type: "login",
                isShown: true,
              })
            }
          >
            here{" "}
          </Link>
          !!!
        </Form.Text>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default Register;
