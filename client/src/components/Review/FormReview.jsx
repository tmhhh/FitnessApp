import messageAntd, { messageTypes } from "components/Common/Toast/message";
import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import reviewApi from "../../api/reviewApi";
import InputField from "../Common/InputField";
import RatingForm from "../Common/RatingForm";

const initialValues = {
  content: "",
  rating: "",
};
const validationSchema = yup.object().shape({
  content: yup.string().required(),
  rating: yup.number().required(),
});

export default function FormReview({ productId }) {
  const handleSubmit = async (formData) => {
    formData = { ...formData, productId };
    await reviewApi.addReview(formData);
    messageAntd(messageTypes.success, "Feedback successfully");
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          return (
            <Form>
              <FastField
                asType="textarea"
                name="content"
                label="Review Content"
                placeholder="Please input your feedback "
                component={InputField}
              />
              <FastField
                name="rating"
                label="Review Rating"
                component={RatingForm}
              />
              <button
                className="common-button common-button-blue"
                type="submit"
              >
                Send
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
