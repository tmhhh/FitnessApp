import { Col, Divider, Popover, Radio, Row, Typography } from "antd";
import { colors } from "assets/color";
import { FastField, Form } from "formik";

const { Text, Paragraph } = Typography;

const PersonalDataForm = ({ listInputFieldsStep1 }) => {
  return (
    <Form>
      <Paragraph>
        In order to use this feature, first you need to provide us your ....
        data. Don't know how to obtain these number? Don't worry, we are here to
        help you.
      </Paragraph>
      <Row>
        {listInputFieldsStep1.map(({ group, data }) => (
          <>
            <Divider type="horizontal" />

            <Col span={4}>
              <Row align="middle">
                <Text style={{ marginRight: 10 }}>{group}</Text>
                <Popover trigger="hover" content={<div>ABC</div>}>
                  <ion-icon
                    style={{ fontSize: 20, color: colors.primaryBlue }}
                    name="information-circle-outline"
                  ></ion-icon>
                </Popover>
              </Row>
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
