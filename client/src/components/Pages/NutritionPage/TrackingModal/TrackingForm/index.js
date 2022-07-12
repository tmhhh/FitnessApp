import { Formik } from "formik";
import * as yup from "yup";

import { Typography } from "antd";
import { GoalDataForm, PersonalDataForm } from "components/Form";
import Lottie from "lottie-react";
import doneLottie from "../../../../../assets/lottie/check-okey-done.json";
import "./style.scss";
const { Paragraph } = Typography;
export default function TrackingForm({
  activeStep,
  setActiveStep,
  formRef,
  formData,
  handleUpdateTrackingInfo,
  listInputFieldsStep1,
  // listInputFields,
}) {
  let content;
  if (activeStep === 0) {
    content = (
      <Formik
        innerRef={formRef}
        validationSchema={yup.object().shape({
          userHeight: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userWeight: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userAge: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userNeck: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userBiceps: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userChest: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userForearm: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userAbdomen: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userWrist: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userHip: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userThigh: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userKnee: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
          userAnkle: yup
            .number()
            .nullable()
            .min(0)
            .required("This field is required"),
        })}
        initialValues={{
          userHeight: null,
          userWeight: null,
          userAge: null,
          userNeck: null,
          userBiceps: null,
          userChest: null,
          userForearm: null,
          userAbdomen: null,
          userWrist: null,
          userHip: null,
          userThigh: null,
          userKnee: null,
          userAnkle: null,
        }}
        onSubmit={(e) => {
          formData.current = {
            trackingFood: {
              addedDate: new Date(),
              listFoods: [],
            },
            ...formData.current,
            ...e,
          };
          setActiveStep(activeStep + 1);
        }}
      >
        {(formikProps) => {
          return (
            <PersonalDataForm
              {...formikProps}
              listInputFieldsStep1={listInputFieldsStep1}
            />
          );
        }}
      </Formik>
    );
  } else if (activeStep === 1) {
    content = (
      <Formik
        validationSchema={yup.object().shape({
          userHeight: yup
            .number()
            .typeError("Input is not in correct format !")
            .required("This field is required"),
          userWeight: yup
            .number()
            .typeError("Input is not in correct format !")
            .required("This field is required"),
          userGender: yup.number().required("This field is required"),
          userAge: yup
            .number()
            .typeError("Input is not in correct format !")
            .min(10)
            .required("This field is required"),
        })}
        initialValues={{
          userHeight: "",
          userWeight: "",
          userAge: "",
          userGender: "",
        }}
        onSubmit={(e) => {
          formData.current = {
            ...formData.current,
            ...e,
          };
          setActiveStep(activeStep + 1);
        }}
        innerRef={formRef}
      >
        {(formikProps) => {
          return <GoalDataForm {...formikProps} />;
        }}
      </Formik>
    );
  } else if (activeStep === 2) {
    content = (
      <>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in
          non consequatur ipsa iste dolore illo ratione voluptas voluptatibus.
          Totam praesentium soluta autem fugiat aperiam cum alias. A, ea dicta.
        </Paragraph>
        <Lottie animationData={doneLottie} style={{ height: "400px" }} />
      </>
    );
  }

  return <>{content}</>;
}
