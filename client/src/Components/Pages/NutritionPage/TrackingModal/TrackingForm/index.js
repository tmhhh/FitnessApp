import { useState } from "react";
import { Formik, Form, FastField } from "formik";
import { Radio, Select } from "antd";
import { Button } from "react-bootstrap";
import FormBT from "react-bootstrap/Form";
import * as yup from "yup";

import "./style.scss";
import InputField from "../../../../Common/InputField";
import SelectField from "../../../../Common/SelectField";
import { Col, Divider, Row, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import Lottie from "lottie-react";
import doneLottie from "../../../../../assets/lottie/check-okey-done.json";
const { Title, Text, Paragraph } = Typography;
export default function TrackingForm({
  activeStep,
  setActiveStep,
  formRef,
  formData,
  handleUpdateTrackingInfo,
  listInputFields,
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
  const dietGoals = [
    { name: "Lose Weight", value: 0 },
    { name: "Maintain Weight", value: 1 },
    { name: "Gain Weight", value: 2 },
  ];
  if (activeStep === 0) {
    return (
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
              <Row>
                {/* <Col span={24}>Descriptionnnnn</Col> */}
                {listInputFields.map(({ group, data }) => (
                  <>
                    <Divider type="horizontal" />
                    <Col span={4}>
                      <Text>{group}</Text>
                    </Col>
                    <Col span={20}>
                      <Row gutter={10}>
                        {data.map((item) => (
                          <>
                            <Col span={12}>
                              <FastField
                                {...item}
                                component={item.component()}
                              />
                            </Col>
                            {item.name === "userAge" && (
                              <Col span={12}>
                                <Radio.Group name="userGender" defaultValue={0}>
                                  <Radio value={0}>Male</Radio>
                                  <Radio value={1}>Female</Radio>
                                </Radio.Group>
                              </Col>
                            )}
                          </>
                        ))}
                      </Row>
                    </Col>
                  </>
                ))}
              </Row>
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
          setActiveStep(activeStep + 1);
        }}
        innerRef={formRef}
      >
        {(formikProps) => {
          return (
            <Form>
              <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                consequuntur error accusantium recusandae eius quaerat! Eius
                soluta, porro modi iste et, asperiores ratione maxime quaerat,
                cumque repellat cupiditate. Ut, adipisci!
              </Paragraph>
              <Row gutter={10}>
                <Col span={12}>
                  <Select defaultValue={0} style={{ width: "100%" }}>
                    {dietGoals.map((item) => (
                      <Option value={item.value}>{item.name}</Option>
                    ))}
                  </Select>
                </Col>
                <Col span={12}>
                  <Select
                    placeholder={"Your activity level"}
                    style={{ width: "100%" }}
                  >
                    {groupBtn.map((item) => (
                      <Option value={item.value}>{item.desc}</Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    );
  } else if (activeStep === 2) {
    return (
      <>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in
          non consequatur ipsa iste dolore illo ratione voluptas voluptatibus.
          Totam praesentium soluta autem fugiat aperiam cum alias. A, ea dicta.
        </Paragraph>
        <Lottie animationData={doneLottie} style={{ height: "400px" }} />;
      </>
    );
  }
}
