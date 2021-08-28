import React from "react";
import Login from "../../Auth/Login";
import Register from "../../Auth/Register";

export default function AuthPage({ type }) {
  return <>{type === "login" ? <Login /> : <Register />}</>;
}
