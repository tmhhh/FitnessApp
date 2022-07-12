import { Form } from "formik";
import { Row, Col, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { Typography } from "antd";
const { Paragraph, Text } = Typography;

const GoalDataForm = ({ ...props }) => {
  const groupBtn = [
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
  ];
  const dietGoals = [
    { name: "Lose Weight", value: 0 },
    { name: "Maintain Weight", value: 1 },
    { name: "Gain Weight", value: 2 },
  ];
  return (
    <Form {...props}>
      <Paragraph>
        After using your data for calculating your body fat. Your body fat is{" "}
        <Text type="danger">15%</Text>
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
          <Select placeholder={"Your activity level"} style={{ width: "100%" }}>
            {groupBtn.map((item) => (
              <Option value={item.value}>{item.desc}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Form>
  );
};

export default GoalDataForm;
