import React, { useState, useContext } from "react";
import { Context } from "../../Contexts";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../api/authApi";
import authSlice from "../../redux/slices/authSlice";
import cartSlice from "../../redux/slices/cartSlice";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

import "./style.scss";
function Login() {
  const dispatch = useDispatch();
  // TOAST
  const { setToast } = useContext(Context);

  //AUTH FORM
  const { authForm, setAuthForm } = useContext(Context);
  const { isShown } = authForm;

  //AUTH DATA
  const authSelector = useSelector((state) => state.authReducer);

  //INPUT
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
      setToast({
        toastShow: true,
        title: "Login ...",
        content: "Please wait a second",
        icon: "👀",
        bg: "info",
      });
      console.log(userNameID, userPassword);
      const res = await authApi.userLogin(userNameID, userPassword);
      if (res.data.isSuccess) {
        setAuthForm({ ...authForm, isShown: false });
        setToast({
          toastShow: true,
          title: "Login successfully !!!",
          content: "Welcome back !!!",
          icon: "✔",
          bg: "success",
        });
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
      }
    } catch (err) {
      console.log(err);
      setToast({
        toastShow: true,
        title: "Failed to login !!!",
        content: "Username or password is incorrect !!!",
        icon: "❌",
        bg: "danger",
      });
    }
  };

  //
  const fetchUserData = async () => {
    try {
      const res = await authApi.getLoginData();
      if (res.data.isSuccess) {
        console.log(res.data.loginUser);
        dispatch(
          authSlice.actions.setAuth({
            authLoading: false,
            isAuthenticated: true,
            userInfo: res.data.loginUser,
          })
        );
        setAuthForm((e) => ({ ...e, isShown: false }));
      }
    } catch (error) {
      console.log(error);
      dispatch(authSlice.actions.setAuthFailed());
    }
  };
  //LOGIN WITH GOOGLE
  const handleLoginWithGoogle = async () => {
    try {
      let timer = null;

      const newWindow = window.open(
        "http://localhost:4000/api/auth/login/google",
        "_blank",
        "width=500,height=600"
      );
      // if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          fetchUserData();
          if (timer) clearInterval(timer);
        }
      }, 500);
      // }
    } catch (error) {
      console.log(error);
      dispatch(authSlice.actions.setAuthFailed());
    }
  };

  //LOGIN WITH FACEBOOK
  const handleLoginWithFacebook = async () => {
    try {
      let timer = null;

      const newWindow = window.open(
        "http://localhost:4000/api/auth/login/fb",
        "_blank",
        "width=500,height=600"
      );
      // if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          fetchUserData();
          if (timer) clearInterval(timer);
        }
      }, 500);
      // }
    } catch (error) {
      console.log(error);
      dispatch(authSlice.actions.setAuthFailed());
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
        <Form.Group className="mb-3 text-center" controlId="formBasicCheckbox">
          <Form.Label>Or login with</Form.Label>
          <FacebookLoginButton
            className="mb-2"
            onClick={handleLoginWithFacebook}
          />
          <GoogleLoginButton onClick={handleLoginWithGoogle} />
        </Form.Group>
      </Form>
      {/* </AuthLayout> */}
    </>
  );
}

export default Login;
