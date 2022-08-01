import { Col, Collapse, Divider, Image, Popover, Row, Typography } from "antd";
import { CLIENT_PUBLIC_URL } from "assets/constants";
import { FastField, Form, Formik } from "formik";
import { convertDataToHealthData } from "utils/calculate";
import * as yup from "yup";
import { listInputFieldsForSkinFold } from "./TrackingFields";
const { Panel } = Collapse;
const { Text, Paragraph } = Typography;
function SkinFoldForm({ formData, formRef }) {
  return (
    <Formik
      innerRef={formRef}
      validationSchema={yup.object().shape({
        bodyMask: yup.number().nullable().min(0).required(),
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
        age: null,
        gender: null,
        bodyMask: null,
        height: null,
        biceps1: null,
        biceps2: null,
        biceps3: null,
        triceps1: null,
        triceps2: null,
        triceps3: null,
        subscapular1: null,
        subscapular2: null,
        subscapular3: null,
        suprailiac1: null,
        suprailiac2: null,
        suprailiac3: null,
      }}
      onSubmit={(e) => {
        formData.current = {
          trackingFood: {
            addedDate: new Date(),
            listFoods: [],
          },
          ...formData.current,
          ...e,
          healthData: convertDataToHealthData({ ...e }),
        };
        // setActiveStep(activeStep + 1);
      }}
    >
      {({ errors }) => {
        return (
          <Form>
            <Divider type="horizontal" />
            <Paragraph>
              Before we proceed, you need a skin fold caliper to estimate the
              following field. Don't have this tool? You can get it from{" "}
              <a href={CLIENT_PUBLIC_URL + `/product/62e563c1a57b0cb434f9921c`}>
                here
              </a>
            </Paragraph>

            {listInputFieldsForSkinFold.map(({ group, data }) => (
              <Collapse style={{ width: "100%" }}>
                <Panel header={group}>
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
              </Collapse>
            ))}
          </Form>
        );
      }}
    </Formik>
  );
}
export default SkinFoldForm;
