import {
  Col,
  Divider,
  Image,
  Popover,
  Row,
  Select,
  Timeline,
  Typography,
} from "antd";
import { Option } from "antd/lib/mentions";
import { colors } from "assets/color";
import { FastField, Form } from "formik";
import { covertHealStatus } from "utils/calculate";
import BodyFatTableMale from "../../assets/img/Body-Fat-Caliper-Chart-men.png";
import BodyFatTableFemale from "../../assets/img/Body-Fat-Caliper-Chart-women.png";
const { Paragraph, Text } = Typography;

const GoalDataForm = ({
  userGender = 0,
  formData,
  predictMethod,
  ...props
}) => {
  const groupBtn = [
    {
      id: 1,
      // isClicked: false,
      title: "Not Very Active",
      img: "https://w7.pngwing.com/pngs/498/948/png-transparent-person-sitting-on-chair-in-front-desk-writing-computer-icons-stick-figure-man-working-desk-miscellaneous-angle-furniture.png",
      desc: "Spend most of the day sitting (e.g., bankteller, desk job)",
      value: 1.2,
    },
    {
      id: 2,
      // isClicked: false,
      title: "Lightly Active",
      img: "https://cdn5.vectorstock.com/i/1000x1000/54/94/lesson-teacher-icon-simple-style-vector-27185494.jpg",
      desc: "Spend a good part of the day on your feet (e.g., teacher, salesperson)",
      value: 1.375,
    },
    {
      id: 3,
      // isClicked: false,
      title: "Active",
      img: "https://cdn.iconscout.com/icon/premium/png-256-thumb/servant-1529655-1293221.png",
      desc: "Spend a good part of the day doing some physical activity (e.g., food server, postal carrier)",
      value: 1.55,
    },
    {
      id: 4,
      // isClicked: false,
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

  const healStatus = covertHealStatus(
    formData.current.gender,
    formData.current.bodyFat
  );
  return (
    <Form {...props}>
      <Divider />
      <Timeline>
        {predictMethod === 1 && (
          <Popover
            trigger="hover"
            content={() => (
              <Image
                preview={false}
                src={userGender === 0 ? BodyFatTableFemale : BodyFatTableMale}
              />
            )}
          >
            <Timeline.Item>
              After calculating your average number is{" "}
              {formData.current.averageNumber}. Refer to the{" "}
              <Text style={{ color: colors.primaryBlue, cursor: "help" }}>
                skin folds to body fat % conversion table.{" "}
              </Text>
            </Timeline.Item>
          </Popover>
        )}

        <Timeline.Item>
          Your corresponding body fat is
          <Text strong type="danger">
            {" "}
            {formData.current.bodyFat.toFixed(2)}%
          </Text>
        </Timeline.Item>

        <Timeline.Item>
          Which means your health is in
          <Text strong type="danger">
            {" "}
            {healStatus.status}
          </Text>
          .
        </Timeline.Item>
        <Timeline.Item style={{ marginBottom: -30 }}>
          So we recommend you to select the
          <Text strong> {healStatus.message} </Text>
          option below .
        </Timeline.Item>
      </Timeline>
      <Row gutter={10}>
        <Col span={12}>
          <FastField
            name="goal"
            component={({ field, form }) => (
              <Select
                {...field}
                onChange={(e) =>
                  field.onChange({
                    target: { name: field.name, value: e },
                  })
                }
                style={{ width: "100%" }}
                placeholder="Your goal"
                status={form.errors["goal"] && "error"}
              >
                {dietGoals.map((item) => (
                  <Option value={item.value}>{item.name}</Option>
                ))}
              </Select>
            )}
          />
        </Col>
        <Col span={12}>
          <FastField
            name="activityLevel"
            component={({ field, form }) => (
              <Select
                {...field}
                onChange={(e) =>
                  field.onChange({
                    target: { name: field.name, value: e },
                  })
                }
                status={form.errors["activityLevel"] && "error"}
                placeholder={"Your activity level"}
                style={{ width: "100%" }}
              >
                {groupBtn.map((item) => (
                  <Option value={item.value}>{item.desc}</Option>
                ))}
              </Select>
            )}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default GoalDataForm;
