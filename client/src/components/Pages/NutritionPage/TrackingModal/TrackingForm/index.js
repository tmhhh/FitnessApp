import { Formik } from "formik";
import * as yup from "yup";

import { Divider, Radio, Timeline, Typography } from "antd";
import { GoalDataForm } from "components/Form";
import Lottie from "lottie-react";
import { useState } from "react";

import { covertHealthStatus } from "utils/calculate";
import doneLottie from "../../../../../assets/lottie/check-okey-done.json";
import { filterNutrition } from "../../constants";
import PredictForm from "./PredictForm";
import SkinFoldForm from "./SkinFoldForm";
import "./style.scss";

const { Text } = Typography;
export default function TrackingForm({
  activeStep,
  setActiveStep,
  formRef,
  formData,
  setConfirmLoading,
  handleUpdateTrackingInfo,
}) {
  const [predictMethod, setPredictMethod] = useState(1);

  let content;
  if (activeStep === 0) {
    content = (
      <>
        <Radio.Group
          onChange={(e) => setPredictMethod(e.target.value)}
          value={predictMethod}
        >
          <Radio value={1}>Using AI</Radio>
          <Radio value={2}>Using skin fold measurement method</Radio>
        </Radio.Group>
        {predictMethod === 1 ? (
          <PredictForm
            formData={formData}
            formRef={formRef}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setConfirmLoading={setConfirmLoading}
          />
        ) : (
          <SkinFoldForm
            formData={formData}
            formRef={formRef}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}
      </>
    );
  } else if (activeStep === 1) {
    console.log(formData.current);
    content = (
      <Formik
        validationSchema={yup.object().shape({
          goal: yup.number().nullable().min(0).required(),
          activityLevel: yup.number().nullable().min(0).required(),
        })}
        initialValues={{
          goal: filterNutrition.goal[
            covertHealthStatus(
              formData.current.gender,
              formData.current.bodyFat
            )?.message.split(" ")[0]
          ],
          activityLevel: null,
        }}
        onSubmit={(e) => {
          formData.current = {
            ...formData.current,
            ...e,
          };
          console.log({ e });
          setActiveStep(activeStep + 1);
        }}
        innerRef={formRef}
      >
        {(formikProps) => {
          return <GoalDataForm formData={formData} {...formikProps} />;
        }}
      </Formik>
    );
  } else if (activeStep === 2) {
    const bodyFatMask = (
      ((formData.current.weight / 2.2) * formData.current.bodyFat) /
      100
    ).toFixed(1);
    const leanMask = formData.current.weight / 2.2 - bodyFatMask;
    let ideaBodyFat;
    let goalAction;
    if (formData.current.goal === 0) {
      ideaBodyFat = formData.current.bodyFat - 2;
      goalAction = "loose";
    } else if (formData.current.goal === 1) {
      ideaBodyFat = formData.current.bodyFat;
      goalAction = "maintain";
    } else {
      ideaBodyFat = formData.current.bodyFat + 2;
      goalAction = "gain";
    }
    const targetMask = Math.abs((leanMask / (1 - ideaBodyFat)).toFixed(1));
    const targetWeek = Math.abs(Math.round(targetMask / 0.5));
    content = (
      <>
        <Divider />
        <Timeline>
          <Timeline.Item>
            Your body fat mask is <Text strong>{bodyFatMask}kg</Text>
          </Timeline.Item>
          <Timeline.Item>
            Your lean mask is<Text strong> {leanMask}kg </Text>(including
            muscle, bone and organs)
          </Timeline.Item>
          <Timeline.Item>
            {/* Target mass = lean mass / (1- desired body fat %) */}
            We assume that you idea body fat is {ideaBodyFat.toFixed(1)}%. So
            you have a target body mass of{" "}
            {Math.abs(formData.current.weight / 2.2 - targetMask)}kg
          </Timeline.Item>
          <Timeline.Item>
            {/* 7.8 /0.5 */}
            The goal of this plan is to help you {goalAction}
            <Text strong> {targetMask}kg</Text> in approximately
            <Text strong bold>
              {" "}
              {targetWeek} week(s)
            </Text>
            .
          </Timeline.Item>
        </Timeline>
        <Lottie
          loop={false}
          animationData={doneLottie}
          style={{ height: "200px", transform: "translateY(-15%)" }}
        />
      </>
    );
  }

  return <>{content}</>;
}
