import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../api/authApi";
import authSlice from "../../redux/slices/authSlice";
import cartSlice from "../../redux/slices/cartSlice";
import "./style.scss";
function Login({ authForm: { isShown }, setAuthForm }) {
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.authReducer);
  const [input, setInput] = useState({
    userNameID: "",
    userPassword: "",
  });

  //INPUT CHANGE
  const handleInputOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //LOGIN
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(authSelector);

    const userNameID = input.userNameID.trim(" ");
    const userPassword = input.userPassword.trim(" ");

    if (userNameID === "" || userPassword === "") return;

    try {
      console.log(userNameID, userPassword);
      const res = await authApi.userLogin(userNameID, userPassword);
      localStorage.setItem("USER_TOKEN", res.data.accessToken);
      dispatch(
        cartSlice.actions.setCart({
          userCart: res.data.user.userCart,
          cartLoading: false,
        })
      );
      delete res.data.user.userCart;
      dispatch(
        authSlice.actions.setAuth({
          authLoading: false,
          isAuthenticated: true,
          userInfo: res.data.user,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* <AuthLayout> */}
      <Form
        className={isShown === true ? "auth_form form_active" : "auth_form"}
        onSubmit={handleOnSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleInputOnChange}
            type="text"
            name="userNameID"
            value={input.userNameID}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleInputOnChange}
            type="password"
            name="userPassword"
            value={input.userPassword}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <div className="form_footer">
          <Form.Text className="text-muted">
            Don't have an account ? Register{" "}
            <a
              href="###"
              onClick={() =>
                setAuthForm({
                  type: "register",
                  isShown: true,
                })
              }
            >
              here{" "}
            </a>{" "}
            !!!
          </Form.Text>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      {/* </AuthLayout> */}
    </>
  );
}

export default Login;
