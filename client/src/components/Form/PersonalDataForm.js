import { Form, FastField } from "formik";
import { Row, Col } from "antd";
import { Radio, Divider, Typography } from "antd";

import InputField from "components/Common/InputField";
const { Text } = Typography;

const PersonalDataForm = () => {
  const listInputFields = [
    {
      group: "Overall",
      data: [
        {
          name: "userHeight",
          label: "Height (inch)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userWeight",
          label: "Weight (lb)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userAge",
          label: "Age",
          component: () => InputField,
          required: true,
        },
      ],
    },
    {
      group: "Upper Body",
      data: [
        {
          name: "userNeck",
          label: "Neck (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userBiceps",
          label: "Biceps (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userChest",
          label: "Chest (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userForearm",
          label: "Forearm (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userAbdomen",
          label: "Abdomen (cm)",
          component: () => InputField,
          required: true,
        },
        {
          name: "userWrist",
          label: "Wrist (cm)",
          component: () => InputField,
          required: true,
        },
      ],
    },
    {
      group: "Lower Body",
      data: [
        {
          name: "userHip",
          label: "Hip",
          component: () => InputField,
        },

        {
          name: "userThigh",
          label: "Thigh (cm)",
          component: () => InputField,
        },

        {
          name: "userKnee",
          label: "Knee (cm)",
          component: () => InputField,
        },

        {
          name: "userAnkle",
          label: "Ankle (cm)",
          component: () => InputField,
        },
      ],
    },
  ];
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
                ))}
              </Row>
            </Col>
          </>
        ))}
      </Row>
    </Form>
  );
};

export default PersonalDataForm;
