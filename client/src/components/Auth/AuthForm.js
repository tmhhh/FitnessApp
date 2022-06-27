import React, { useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import { Context } from "../../contexts";

export default function AuthForm(props) {
  const { authForm } = useContext(Context);
  const { type } = authForm;
  return <>{type === "login" ? <Login /> : <Register />}</>;
}
