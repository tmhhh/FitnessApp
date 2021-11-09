import { FastField, Formik } from "formik";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { authApi } from "../../api/authApi";
import { BASE_API_URL } from "../../assets/constants";
import { Context } from "../../Contexts";
import authSlice from "../../redux/slices/authSlice";
import cartSlice from "../../redux/slices/cartSlice";
import InputField from "../Common/InputField";
import OtherLoginButton from "./OtherLoginButton";
import "./style.scss";
function Login() {
  const dispatch = useDispatch();
  // TOAST
  const { setToast } = useContext(Context);

  //AUTH FORM
  const { authForm, setAuthForm } = useContext(Context);
  const { isShown } = authForm;

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
  const handleOnSubmit = async (values, event) => {
    // e.preventDefault();
    const { userNameID, userPassword } = values;
    console.log(event);

    // if (userNameID === "" || userPassword === "") return;

    try {
      setToast({
        toastShow: true,
        title: "Login ...",
        content: "Please wait a second",
        icon: "👀",
        bg: "info",
      });
      // console.log(userNameID, userPassword);
      const res = await authApi.userLogin(userNameID, userPassword);
      // console.log(res.data);
      if (res.data.isSuccess) {
        // event.resetForm();
        // event.setTouched({});
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
        localStorage.setItem("USER_TOKEN", res.data.accessToken);
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
      console.log("eror");
      let timer = null;

      const newWindow = window.open(
        BASE_API_URL + "/auth/login/google",
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
        BASE_API_URL + "/auth/login/fb",
        "_blank",
        "width=500,height=600"
      );
      // if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          await fetchUserData();
          if (timer) clearInterval(timer);
        }
      }, 500);
      // }
    } catch (error) {
      console.log({ error });
      dispatch(authSlice.actions.setAuthFailed());
    }
  };
  return (
    isShown === true && (
      <Formik
        initialValues={{ userNameID: "", userPassword: "" }}
        validationSchema={yup.object().shape({
          userNameID: yup.string().required("This field is required"),
          userPassword: yup.string().required("This field is required"),
        })}
        onSubmit={(values, event) => handleOnSubmit(values, event)}
      >
        {(formikProps) => {
          const { errors, values, touched } = formikProps;
          console.log({ errors, values, touched });
          return (
            <Form onSubmit={formikProps.handleSubmit} className={"auth_form "}>
              <FastField
                name="userNameID"
                placeholder="Your username ..."
                component={InputField}
                required
                label="Username"
              />
              <FastField
                name="userPassword"
                label="Password"
                required
                placeholder="Your password ..."
                component={InputField}
              />

              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group> */}
              <div className="form_footer">
                <Form.Text className="text-muted">
                  Don't have an account? Register{" "}
                  <a
                    href="###"
                    onClick={() =>
                      setAuthForm({
                        type: "register",
                        isShown: true,
                      })
                    }
                  >
                    here
                  </a>
                  !!!
                </Form.Text>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
              <Form.Group
                className="mb-3 text-center"
                controlId="formBasicCheckbox"
              >
                <Form.Label style={{ fontWeight: 600,fontSize:"1.3rem" }}>
                  Or login with
                </Form.Label>
                <OtherLoginButton
                  title="Login with Facebook"
                  img="https://fullstack.edu.vn/assets/images/signin/facebook-18px.svg"
                  handleLogin={handleLoginWithFacebook}
                />
                <OtherLoginButton
                  title="Login with Google"
                  img="https://fullstack.edu.vn/assets/images/signin/google-18px.svg"
                  handleLogin={handleLoginWithGoogle}
                />
              </Form.Group>
            </Form>
          );
        }}

        {/* </AuthLayout> */}
      </Formik>
    )
  );
}

export default Login;
