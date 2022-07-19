import { FastField, Form, Formik } from "formik";
import * as yup from "yup";

import { Col, Input, Row, Typography } from "antd";
import { colors } from "assets/color";
import { GoalDataForm } from "components/Form";
import Lottie from "lottie-react";
import doneLottie from "../../../../../assets/lottie/check-okey-done.json";
import "./style.scss";
const { Paragraph, Text } = Typography;
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
            <Form>
              <Paragraph>
                In order to use this feature, we have to obtain your skin fold
                measurements. Don't know how to obtain these number? Don't
                worry, we are here to help you.
              </Paragraph>
              <Row>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Size
                  </Text>
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Measurement 1
                  </Text>
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Measurement 2
                  </Text>
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Measurement 3
                  </Text>
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Biceps
                  </Text>
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="biceps1"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="biceps2"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="biceps3"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Triceps{" "}
                  </Text>
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="triceps1"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="triceps2"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="triceps3"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Subscapular{" "}
                  </Text>
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="subscapular1"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="subscapular2"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="subscapular3"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Suprailiac{" "}
                  </Text>
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="suprailiac1"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="suprailiac2"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="suprailiac3"
                    component={(props) => <Input {...props} />}
                  />
                </Col>
              </Row>
            </Form>
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
