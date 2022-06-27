import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import FormBootStrap from "react-bootstrap/Form";
import "./style.scss";
import { Context } from "../../contexts";
import { Formik, Form, FastField } from "formik";
import InputField from "../Common/InputField";
import * as yup from "yup";
import { authApi } from "../../api/authApi";
function Register() {
  //  AUTH CONTEXT
  const { authForm, setAuthForm, setToast } = useContext(Context);
  const { isShown } = authForm;

  // const [input, setInput] = useState({
  //   username: "",
  //   password: "",
  //   rePassword: "",
  // });

  // //
  // const handleInputOnChange = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // };

  // //REGISTER
  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  // };
  // const [err, setError] = useState(null);
  const err = null;
  const handleRegisterUser = async (values) => {
    try {
      const res = await authApi.userRegister(values);
      if (res.data.isSuccess) {
        setToast({
          toastShow: true,
          title: "Register successfully !!!",
          content: "You can login now !!!",
          icon: "✔",
          bg: "success",
        });
        return setAuthForm({
          type: "login",
          isShown: true,
        });
      }
    } catch (error) {
      // alert(error.response.status);
      if (error.response.status === 400)
        // setToast({
        //   toastShow: true,
        //   title: "Failed to register  !!!",
        //   content: error.response.data.error + " !!!",
        //   icon: "❌",
        //   bg: "danger",
        // });
        // setError(error.response.data.error + " !!!");
        err = error.response.data.error + " !!!";
    }
  };

  return (
    <Formik
      initialValues={{
        userNameID: "",
        userName: "",
        userPassword: "",
        userPasswordConfirm: "",
        userEmail: "",
      }}
      validationSchema={yup.object().shape({
        userNameID: yup.string().required("This field is required"),
        userName: yup.string().required("This field is required"),
        userEmail: yup
          .string()
          .email("Invalid email format")
          .required("This field is required"),
        userPassword: yup
          .string()
          .required("Please Enter your password")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
        userPasswordConfirm: yup
          .string()
          .test("passwords-match", "Passwords must match", function (value) {
            return this.parent.userPassword === value;
          })
          .required("This field is required"),
      })}
      onSubmit={(values) => handleRegisterUser(values)}
    >
      {(formikProps) => {
        const { errors, touched } = formikProps;
        console.log({ errors, touched });
        if (err !== null) {
          errors.userNameID = err;
          touched.userNameID = true;
        }

        return (
          isShown === true && (
            <Form className={"auth_form form_active"}>
              <FastField
                required
                label="Your Username"
                placeholder="Enter name ..."
                name="userNameID"
                type="text"
                component={InputField}
              />
              <FastField
                required
                label="Your name"
                placeholder="Enter name ..."
                name="userName"
                type="text"
                component={InputField}
              />
              <FastField
                required
                label="Your Email"
                placeholder="Enter email ..."
                name="userEmail"
                type="text"
                component={InputField}
              />
              <FastField
                required
                label="Your Password"
                placeholder="Enter password ..."
                name="userPassword"
                type="password"
                component={InputField}
              />
              <FastField
                required
                label="Confirm Your Password"
                placeholder="Enter password confirmation ..."
                name="userPasswordConfirm"
                type="password"
                component={InputField}
              />
              <div className="form_footer">
                <FormBootStrap.Text className="text-muted">
                  Already have an account ? Login{" "}
                  <p
                    style={{
                      display: "inline-block",
                      textDecoration: "underline",
                      color: "blue",
                    }}
                    role="button"
                    onClick={() =>
                      setAuthForm({
                        type: "login",
                        isShown: true,
                      })
                    }
                  >
                    here{" "}
                  </p>
                  !!!
                </FormBootStrap.Text>
                <button className="common-outline-button common-outline-button-blue my-3 w-100" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          )
        );
      }}
    </Formik>
  );
}

export default Register;
