import React from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthForm(props) {
  const {
    authForm: { type },
  } = props;
  return (
    <>{type === "login" ? <Login {...props} /> : <Register {...props} />}</>
  );
}
