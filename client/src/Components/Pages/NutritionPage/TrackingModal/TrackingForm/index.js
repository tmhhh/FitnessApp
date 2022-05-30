import { useState } from "react";
import { Formik, Form, FastField } from "formik";
import { Button } from "react-bootstrap";
import FormBT from "react-bootstrap/Form";
import * as yup from "yup";

import "./style.scss";
import InputField from "../../../../Common/InputField";
import SelectField from "../../../../Common/SelectField";
export default function TrackingForm({
  activeStep,
  setActiveStep,
  formRef,
  formData,
  handleUpdateTrackingInfo,
}) {
  const [error, setError] = useState(null);
  const [groupBtn, setGroupBtn] = useState([
    {
      id: 1,
      isClicked: false,
      title: "Not Very Active",
      img: "https://w7.pngwing.com/pngs/498/948/png-transparent-person-sitting-on-chair-in-front-desk-writing-computer-icons-stick-figure-man-working-desk-miscellaneous-angle-furniture.png",
      desc: "Spend most of the day sitting (e.g., bankteller, desk job)",
      value: 1.2,
    },
    {
      id: 2,
      isClicked: false,
      title: "Lightly Active",
      img: "https://cdn5.vectorstock.com/i/1000x1000/54/94/lesson-teacher-icon-simple-style-vector-27185494.jpg",
      desc: "Spend a good part of the day on your feet (e.g., teacher, salesperson)",
      value: 1.375,
    },
    {
      id: 3,
      isClicked: false,
      title: "Active",
      img: "https://cdn.iconscout.com/icon/premium/png-256-thumb/servant-1529655-1293221.png",
      desc: "Spend a good part of the day doing some physical activity (e.g., food server, postal carrier)",
      value: 1.55,
    },
    {
      id: 4,
      isClicked: false,
      title: "Very Active",
      img: "https://cdn.iconscout.com/icon/premium/png-256-thumb/running-3251258-2709000.png",
      desc: "Spend a good part of the day doing some physical activity (e.g., food server, postal carrier)",
      value: 1.725,
    },
  ]);

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
        initialValues={{
          userActivityLevel: 0,
        }}
        onSubmit={(e) => {
          if (groupBtn.every((e) => !e.isClicked))
            return setError("Please choose your type");
          const userActivityLevel = groupBtn.find((e) => e.isClicked).value;
          formData.current = {
            ...formData.current,
            userActivityLevel,
            isFilled: true,
          };
          handleUpdateTrackingInfo();
          setActiveStep(0);
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <div className="custom__button-container">
                {groupBtn.map((btn) => (
                  <div
                    key={btn.id}
                    onClick={() => {
                      setGroupBtn(
                        groupBtn.map((e) => {
                          if (e.id === btn.id) {
                            return { ...e, isClicked: true };
                          }
                          return { ...e, isClicked: false };
                        })
                      );
                    }}
                    className={`custom__button ${btn.isClicked && "clicked"}`}
                  >
                    <div className="custom__button__left">
                      <img src={btn.img} alt="" />
                    </div>
                    <div className="custom__button__right">
                      <h3 className="custom__button__right-title">
                        {btn.title}
                      </h3>
                      <h5 className="custom__button__right-desc">{btn.desc}</h5>
                    </div>
                  </div>
                ))}
              </div>
              {error && (
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  {error}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    );
  }
}
