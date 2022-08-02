import { Col, Collapse, Divider, Image, Popover, Row, Typography } from "antd";
import { CLIENT_PUBLIC_URL } from "assets/constants";
import { FastField, Form, Formik } from "formik";
import { convertDataToHealthData } from "utils/calculate";
import * as yup from "yup";
import { listInputFieldsForSkinFold } from "./TrackingFields";
const { Panel } = Collapse;
const { Text, Paragraph } = Typography;
function SkinFoldForm({ formData, formRef, setActiveStep, activeStep }) {
  return (
    <Formik
      innerRef={formRef}
      validationSchema={yup.object().shape({
        weight: yup.number().nullable().min(0).required(),
        height: yup.number().nullable().min(0).required(),
        age: yup.number().nullable().min(0).required(),
        gender: yup.number().nullable().required(),
        biceps1: yup.number().nullable().min(0).required(),
        biceps2: yup.number().nullable().min(0).required(),
        biceps3: yup.number().nullable().min(0).required(),
        triceps1: yup.number().nullable().min(0).required(),
        triceps2: yup.number().nullable().min(0).required(),
        triceps3: yup.number().nullable().min(0).required(),
        subscapular1: yup.number().nullable().min(0).required(),
        subscapular2: yup.number().nullable().min(0).required(),
        subscapular3: yup.number().nullable().min(0).required(),
        suprailiac1: yup.number().nullable().min(0).required(),
        suprailiac2: yup.number().nullable().min(0).required(),
        suprailiac3: yup.number().nullable().min(0).required(),
      })}
      initialValues={{
        age: 22,
        gender: 0,
        weight: 75,
        height: 186,
        biceps1: 10,
        biceps2: 11,
        biceps3: 10,
        triceps1: 14,
        triceps2: 13,
        triceps3: 14,
        subscapular1: 20,
        subscapular2: 21,
        subscapular3: 20,
        suprailiac1: 25,
        suprailiac2: 24,
        suprailiac3: 25,
      }}
      onSubmit={(e) => {
        const averageUserData =
          ((e.subscapular1 + e.subscapular2 + e.subscapular3) / 3 +
            (e.biceps1 + e.biceps2 + e.biceps3) / 3 +
            (e.triceps1 + e.triceps2 + e.triceps1) / 3 +
            (e.suprailiac1 + e.suprailiac2 + e.suprailiac3) / 3) /
          12;

        const healthData = convertDataToHealthData({
          age: e.age,
          gender: e.gender,
          averageUserData,
        });
        formData.current = {
          trackingFood: {
            addedDate: new Date(),
            listFoods: [],
          },
          ...formData.current,
          ...e,
          height: e.height * 0.393701,
          weight: e.weight * 2.2,
          averageUserData,
          bodyFat: +healthData.bodyFat.split("-")[0],
        };
        setActiveStep(activeStep + 1);
      }}
    >
      {({ errors }) => {
        return (
          <Form>
            <Divider type="horizontal" />
            <Paragraph>
              Before we proceed, you need a skin fold caliper to estimate the
              following field. Don't have this tool? You can get it from{" "}
              <a
                target={"_blank"}
                href={CLIENT_PUBLIC_URL + `product/62e563c1a57b0cb434f9921c`}
                rel="noreferrer"
              >
                here
              </a>
            </Paragraph>

            <Collapse defaultActiveKey={["0"]} style={{ width: "100%" }}>
              {listInputFieldsForSkinFold.map(({ group, data }, index) => (
                <Panel key={index} header={group}>
                  <Row gutter={10}>
                    {data.map((item) => {
                      return item.src ? (
                        <Popover
                          trigger="hover"
                          placement="bottom"
                          content={() => (
                            <Row gutter={10} style={{ width: 750 }}>
                              <Col span={6}>
                                <Image
                                  style={{ width: "100%", aspectRatio: 1 }}
                                  src={item.src}
                                  alt={item.name}
                                />
                              </Col>
                              <Col span={18}>
                                <Text>
                                  <Text strong>Tips: </Text>
                                  {item.tips}
                                </Text>
                              </Col>
                            </Row>
                          )}
                        >
                          <Col span={12}>
                            <FastField {...item} component={item.component()} />
                          </Col>
                        </Popover>
                      ) : (
                        <Col span={12}>
                          <FastField {...item} component={item.component()} />
                        </Col>
                      );
                    })}
                  </Row>
                </Panel>
              ))}
            </Collapse>
          </Form>
        );
      }}
    </Formik>
  );
}
export default SkinFoldForm;
