import React, { useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import { Context } from "../../Contexts";

export default function AuthForm(props) {
  const { authForm, setAuthForm } = useContext(Context);
  const { type } = authForm;
  return <>{type === "login" ? <Login /> : <Register />}</>;
}
