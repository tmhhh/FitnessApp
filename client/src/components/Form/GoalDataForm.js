import {
  Col,
  Divider,
  Image,
  Popover,
  Row,
  Select,
  Timeline,
  Tooltip,
  Typography,
} from "antd";
import { Option } from "antd/lib/mentions";
import { colors } from "assets/color";
import { FastField, Form } from "formik";
import { covertHealthStatus } from "utils/calculate";
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
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1LROfHegquMo1RgjpTkcg3p5W8Esko7OI8dOfCHCnGObT_PCd03-rEUU2KFxV7IEWLoY&usqp=CAU",
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
    {
      name: "Lose Weight",
      value: 0,
      icon: (
        <ion-icon
          style={{ fontSize: "1.5rem", marginRight: 5 }}
          name="arrow-down-outline"
        ></ion-icon>
      ),
    },
    {
      name: "Maintain Weight",
      value: 1,
      icon: (
        <ion-icon
          style={{ fontSize: "1.5rem", marginRight: 5 }}
          name="swap-horizontal-outline"
        ></ion-icon>
      ),
    },
    {
      name: "Gain Weight",
      value: 2,
      icon: (
        <ion-icon
          style={{ fontSize: "1.5rem", marginRight: 5 }}
          name="arrow-up-outline"
        ></ion-icon>
      ),
    },
  ];

  const healStatus = covertHealthStatus(
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
                  <Option
                    style={{ display: "flex", alignItems: "center" }}
                    value={item.value}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {item.icon}
                      <Text>{item.name}</Text>
                    </div>
                  </Option>
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
                  <Option value={item.value}>
                    <Tooltip title={item.desc}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          preview={false}
                          style={{ marginRight: 5, width: 30, aspectRatio: 1 }}
                          src={item.img}
                        />
                        <Text strong>{item.title}</Text>
                      </div>
                    </Tooltip>
                  </Option>
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
