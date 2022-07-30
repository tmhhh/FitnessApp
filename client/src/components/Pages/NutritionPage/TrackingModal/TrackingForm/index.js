import { Formik } from "formik";
import * as yup from "yup";

import { Radio, Space, Timeline, Typography } from "antd";
import { GoalDataForm } from "components/Form";
import Lottie from "lottie-react";
import { useState } from "react";

import doneLottie from "../../../../../assets/lottie/check-okey-done.json";
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
    content = (
      <Formik
        validationSchema={yup.object().shape({
          goal: yup.number().nullable().min(0).required(),
          activityLevel: yup.number().nullable().min(0).required(),
        })}
        initialValues={{
          goal: null,
          activityLevel: null,
        }}
        onSubmit={(e) => {
          formData.current = {
            ...formData.current,
            ...e,
          };
          setActiveStep(activeStep + 1);
          setConfirmLoading(true);
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
      <Space style={{ margin: "20px 10px" }}>
        <Timeline>
          <Timeline.Item>
            Your body fat mask is <Text strong>25.5kg</Text>
          </Timeline.Item>
          <Timeline.Item>
            Your lean mask is 47.9kg (including muscle, bone and organs)
          </Timeline.Item>
          <Timeline.Item>
            {/* Target mass = lean mass / (1- desired body fat %) */}
            We assume that you idea body fat is 27%. So you has a target body
            mass of 65.6kg
          </Timeline.Item>
          <Timeline.Item>
            {/* 7.8 /0.5 */}
            The goal of this plan is to help you reduce{" "}
            <Text strong>7.8kg </Text>in approximately
            <Text bold>16 weeks</Text>.
          </Timeline.Item>
        </Timeline>
        <Lottie
          loop={false}
          animationData={doneLottie}
          style={{ height: "200px", transform: "translateY(-15%)" }}
        />
      </Space>
    );
  }

  return <>{content}</>;
}
