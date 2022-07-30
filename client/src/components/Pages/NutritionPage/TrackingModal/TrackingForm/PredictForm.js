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
import { FastField, Formik } from "formik";
import * as yup from "yup";
import { listInputFieldsForPredict } from "./TrackingFields";
const { Panel } = Collapse;
const { Text, Paragraph } = Typography;
function PredictForm({ formRef, activeStep, setActiveStep, formData }) {
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
      onSubmit={async (e) => {
        formData.current = {
          trackingFood: {
            addedDate: new Date(),
            listFoods: [],
          },
          ...formData.current,
          ...e,
        };
        console.log("@@@@@@@@@");
        console.log(formData.current);
        // setActiveStep(activeStep + 1);

        //CALL API
        // try {
        //   const res = await axiosClient;
        // } catch (error) {
        //   console.log({ error });
        // }
      }}
    >
      {({ errors }) => {
        return (
          <>
            <Divider type="horizontal" />
            <Paragraph>
              Before we proceed, we need some key information:
            </Paragraph>
            {listInputFieldsForPredict.map(({ group, data }) => (
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
              </Collapse>
            ))}
          </>
        );
      }}
    </Formik>
  );
}

export default PredictForm;
