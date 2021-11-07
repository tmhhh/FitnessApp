import { useState } from "react";
import { Formik, Form, FastField } from "formik";
import { Button } from "react-bootstrap";
import FormBT from "react-bootstrap/Form";
import * as yup from "yup";
import InputField from "../../../../Common/InputField";
import SelectField from "../../../../Common/SelectField";
export default function TrackingForm({
  activeStep,
  setActiveStep,
  formRef,
  formData,
  handleUpdateTrackingInfo,
}) {
  if (activeStep === 0) {
    return (
      <Formik
        innerRef={formRef}
        validationSchema={yup.object().shape({
          userGoal: yup
            .number()
            .min(0, "Please choose your goal")
            .required("This field is required"),
        })}
        initialValues={{
          userGoal: 0,
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
            <Form>
              <FastField
                fieldType={1}
                name="userGoal"
                optionDefaultName=" "
                options={[
                  { name: "Lose Weight", value: 0 },
                  { name: "Maintain Weight", value: 1 },
                  { name: "Gain Weight", value: 2 },
                ]}
                label={"Choose Your Diet Goal"}
                component={SelectField}
              />
            </Form>
          );
        }}
      </Formik>
    );
  } else if (activeStep === 1) {
    return (
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
          console.log(e);
          setActiveStep(activeStep + 1);
        }}
        innerRef={formRef}
      >
        {(formikProps) => {
          return (
            <Form>
              <FastField
                name="userWeight"
                label="Weight (kg)"
                placeholder="Fill your current weight ..."
                component={InputField}
              />
              <FastField
                name="userHeight"
                label="Height (cm)"
                placeholder="Fill your current height ..."
                component={InputField}
              />
              <FastField
                name="userAge"
                label="Age"
                placeholder="Fill your current age ..."
                component={InputField}
              />
              <FastField
                fieldType={1}
                name="userGender"
                optionDefaultName=" "
                options={[
                  { name: "Male", value: 0 },
                  { name: "Female", value: 1 },
                ]}
                label={"Choose your sex"}
                component={SelectField}
              />
            </Form>
          );
        }}
      </Formik>
    );
  } else if (activeStep === 2) {
    return (
      <Formik
        innerRef={formRef}
        validationSchema={yup.object().shape({
          userActivityLevel: yup.number().required("This field is required"),
        })}
        initialValues={{
          userActivityLevel: 0,
        }}
        onSubmit={(e) => {
          formData.current = { ...formData.current, ...e, isFilled: true };
          console.log(formData.current);
          setActiveStep(0);
          handleUpdateTrackingInfo();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <FastField
                fieldType={1}
                label={"What is your baseline activity level?"}
                name="userActivityLevel"
                optionDefaultName=" "
                options={[
                  {
                    name: "Not Very Active - Spend most of the day sitting (e.g., bankteller, desk job)",
                    value: 1.2,
                  },
                  {
                    name: "Lightly Active - Spend a good part of the day on your feet (e.g., teacher, salesperson)",
                    value: 1.375,
                  },
                  {
                    name: "Active - Spend a good part of the day doing some physical activity (e.g., food server, postal carrier)",
                    value: 1.55,
                  },
                  {
                    name: "Very Active - Spend a good part of the day doing heavy physical activity (e.g., bike messenger, carpenter)",
                    value: 1.725,
                  },
                ]}
                component={SelectField}
              />
            </Form>
          );
        }}
      </Formik>
    );
  }
}
