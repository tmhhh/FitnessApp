import {
  Col,
  Collapse,
  Divider,
  Image,
  Popover,
  Radio,
  Row,
  Typography,
} from "antd";
import { PREDICT_BODY_FAT_API_URL } from "assets/constants";
import axios from "axios";
import { FastField, Formik } from "formik";
import * as yup from "yup";
import { listInputFieldsForPredict } from "./TrackingFields";
const { Panel } = Collapse;
const { Text, Paragraph } = Typography;
function PredictForm({
  formRef,
  activeStep,
  setActiveStep,
  formData,
  setConfirmLoading,
}) {
  return (
    <Formik
      innerRef={formRef}
      validationSchema={yup.object().shape({
        height: yup
          .number()
          .nullable()
          .min(0)
          .required("This field is required"),
        weight: yup
          .number()
          .nullable()
          .min(0)
          .required("This field is required"),
        age: yup.number().nullable().min(0).required("This field is required"),
        neck: yup.number().nullable().min(0).required("This field is required"),
        biceps: yup
          .number()
          .nullable()
          .min(0)
          .required("This field is required"),
        chest: yup
          .number()
          .nullable()
          .min(0)
          .required("This field is required"),
        forearm: yup
          .number()
          .nullable()
          .min(0)
          .required("This field is required"),
        abdomen: yup
          .number()
          .nullable()
          .min(0)
          .required("This field is required"),
        wrist: yup
          .number()
          .nullable()
          .min(0)
          .required("This field is required"),
        hip: yup.number().nullable().min(0).required("This field is required"),
        thigh: yup
          .number()
          .nullable()
          .min(0)
          .required("This field is required"),
        knee: yup.number().nullable().min(0).required("This field is required"),
        ankle: yup
          .number()
          .nullable()
          .min(0)
          .required("This field is required"),
      })}
      initialValues={{
        height: 186,
        weight: 75,
        age: 22,
        neck: 40,
        biceps: 38,
        chest: 90,
        forearm: 28,
        abdomen: 75,
        wrist: 15,
        hip: 90,
        thigh: 55,
        knee: 38,
        ankle: 22,
      }}
      onSubmit={async (e) => {
        formData.current = {
          trackingFood: {
            addedDate: new Date(),
            listFoods: [],
          },
          ...formData.current,
          ...e,
          height: e.height * 0.393701,
          weight: e.weight * 2.2,
        };

        //CALL API
        try {
          setConfirmLoading(true);
          const response = await axios.get(PREDICT_BODY_FAT_API_URL, {
            params: {
              ...formData.current,
            },
          });
          console.log({ response });
          formData.current = {
            ...formData.current,
            bodyFat: response.data.data[0],
          };
          setTimeout(() => {
            setActiveStep(activeStep + 1);
            setConfirmLoading(false);
          }, 3000);
        } catch (error) {
          console.log({ error });
        }
      }}
    >
      {({ errors }) => {
        return (
          <>
            <Divider type="horizontal" />
            <Paragraph>
              Before we proceed, we need some key information:
            </Paragraph>
            <Collapse defaultActiveKey={["0"]} style={{ width: "100%" }}>
              {listInputFieldsForPredict.map(({ group, data }, index) => (
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
                          {item.name === "userAge" && (
                            <Col span={12}>
                              <Radio.Group name="userGender" defaultValue={0}>
                                <Radio value={0}>Male</Radio>
                                <Radio value={1}>Female</Radio>
                              </Radio.Group>
                            </Col>
                          )}
                        </Popover>
                      ) : (
                        <>
                          <Col span={12}>
                            <FastField {...item} component={item.component()} />
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
                      );
                    })}
                  </Row>
                </Panel>
              ))}
            </Collapse>
          </>
        );
      }}
    </Formik>
  );
}

export default PredictForm;
