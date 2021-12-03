import Button from "react-bootstrap/Button";
import { Formik, Form, FastField } from "formik";
import InputField from "../../../../Common/InputField";
import * as yup from "yup";
export default function PasswordForm({ handleChangePassword }) {
  return (
    <Formik
      initialValues={{
        userPassword: "",
        userConfirmPassword: "",
      }}
      validationSchema={yup.object().shape({
        userPassword: yup
          .string()
          .required("Please Enter your password")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must contain AT LEAST 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character"
          ),
        userConfirmPassword: yup
          .string()
          .test("passwords-match", "Passwords must match", function (value) {
            return this.parent.userPassword === value;
          })
          .required("Require"),
      })}
      onSubmit={handleChangePassword}
    >
      {(formmikProps) => {
        return (
          <Form className="position-relative">
            <FastField
              name="userPassword"
              className="w-50 "
              label="Your new password"
              type="password"
              placeholder="Ex: ******"
              required
              component={InputField}
              type="password"
            />
            <FastField
              type="password"
              name="userConfirmPassword"
              className="w-50 "
              label="Confirm your password"
              type="password"
              placeholder="Ex: ****** "
              required
              component={InputField}
            />
            <Button
              style={{ right: "50%" }}
              className="position-absolute"
              type="submit"
              variant="primary"
            >
              Save Changes
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
