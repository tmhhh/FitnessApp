import { useContext } from "react";
import { Context } from "../../contexts";
import Login from "./Login";
import Register from "./Register";

export default function AuthForm() {
  const { authForm } = useContext(Context);
  const { type } = authForm;
  return <>{type === "login" ? <Login /> : <Register />}</>;
}
