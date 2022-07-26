import { FastField, Form, Formik } from "formik";
import * as yup from "yup";

import { Col, Image, Input, Popover, Row, Select, Typography } from "antd";
import { colors } from "assets/color";
import { GoalDataForm } from "components/Form";
import Lottie from "lottie-react";
import bicepsIllustrator from "../../../../../assets/img/biceps.png";
import subscapularIllustrator from "../../../../../assets/img/subscapular.png";
import suprailiacIllustrator from "../../../../../assets/img/suprailiac.png";
import tricepsIllustrator from "../../../../../assets/img/triceps.png";
import doneLottie from "../../../../../assets/lottie/check-okey-done.json";
import "./style.scss";
const { Paragraph, Text } = Typography;
const { Option } = Select;
export default function TrackingForm({
  activeStep,
  setActiveStep,
  formRef,
  formData,
  setConfirmLoading,
  handleUpdateTrackingInfo,
  listInputFieldsStep1,
  // listInputFields,
}) {
  let content;
  if (activeStep === 0) {
    content = (
      <Formik
        innerRef={formRef}
        validationSchema={yup.object().shape({
          bodyMask: yup.number().nullable().min(0).required(),
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
          };
          setActiveStep(activeStep + 1);
        }}
      >
        {({ errors }) => {
          return (
            <Form>
              <Paragraph>
                Before we proceed, we need some key information:
              </Paragraph>
              <Row className="mb-3" gutter={10}>
                <Col span={8}>
                  <FastField
                    required
                    name="gender"
                    component={({ field }) => {
                      console.log({ field });
                      return (
                        <Select
                          {...field}
                          onChange={(e) =>
                            field.onChange({
                              target: { name: field.name, value: e },
                            })
                          }
                          status={errors["gender"] && "error"}
                          className="w-100"
                          placeholder="Select your gender"
                        >
                          <Option value="0">Male</Option>
                          <Option value="1">Female</Option>
                        </Select>
                      );
                    }}
                  />
                </Col>
                <Col span={8}>
                  <FastField
                    required
                    name="age"
                    component={({ field }) => {
                      return (
                        <Input
                          status={errors["age"] && "error"}
                          min={1}
                          max={80}
                          placeholder="Input your age"
                          type="number"
                          {...field}
                        />
                      );
                    }}
                  />
                </Col>
                <Col span={8}>
                  <FastField
                    required
                    name="bodyMask"
                    component={({ field }) => (
                      <Input
                        status={errors["bodyMask"] && "error"}
                        min={1}
                        max={80}
                        placeholder="Input your body mask"
                        type="number"
                        {...field}
                      />
                    )}
                  />
                </Col>
              </Row>
              <Paragraph>
                In order to use this feature, we have to obtain your skin fold
                measurements. Don't know how to obtain these number? Don't
                worry, we are here to help you.
              </Paragraph>
              <Row>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Size
                  </Text>
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Measurement 1
                  </Text>
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Measurement 2
                  </Text>
                </Col>
                <Col span={6}>
                  <Text
                    style={{
                      padding: "4px 11px",
                      background: colors.black,
                      color: colors.white,
                      fontWeight: "700",
                    }}
                    className="d-block text-center  border"
                  >
                    Measurement 3
                  </Text>
                </Col>
                <Col span={6}>
                  <Popover
                    trigger="hover"
                    placement="bottom"
                    content={() => (
                      <Row>
                        <Col span={6}>
                          <Image
                            height={200}
                            width={200}
                            src={bicepsIllustrator}
                            alt="biceps"
                          />
                        </Col>
                        <Col span={18}>
                          <Text>
                            <Text strong>Tips: </Text>
                            Mid point on the muscle (generally this will be
                            opposite the nipple). Mark the point halfway between
                            the FLEXED bicep muscle. When taking the
                            measurement, the muscle (arm) should be RELAXED and
                            in a perpendicular position
                          </Text>
                        </Col>
                      </Row>
                    )}
                  >
                    <Text
                      style={{
                        padding: "4px 11px",
                        background: colors.black,
                        color: colors.white,
                        fontWeight: "700",
                      }}
                      className="d-block text-center  border"
                    >
                      Biceps
                    </Text>
                  </Popover>
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="biceps1"
                    component={({ field }) => (
                      <Input status={errors["biceps1"] && "error"} {...field} />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="biceps2"
                    component={({ field }) => (
                      <Input status={errors["biceps2"] && "error"} {...field} />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="biceps3"
                    component={({ field }) => (
                      <Input status={errors["biceps3"] && "error"} {...field} />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <Popover
                    trigger="hover"
                    placement="bottom"
                    content={() => (
                      <Row>
                        <Col span={6}>
                          <Image
                            height={200}
                            width={200}
                            src={tricepsIllustrator}
                            alt="triceps"
                          />
                        </Col>
                        <Col span={18}>
                          <Text>
                            <Text strong>Tips: </Text>
                            Between the tip of the olecranon process of the ulna
                            (elbow) and the acromium of the scapula
                            (shoulder).Mark the point on the back of the arm
                            halfway between the tip of the elbow and the
                            shoulder mark should be 1/2 way between caliper
                            jaws.
                          </Text>
                        </Col>
                      </Row>
                    )}
                  >
                    <Text
                      style={{
                        padding: "4px 11px",
                        background: colors.black,
                        color: colors.white,
                        fontWeight: "700",
                      }}
                      className="d-block text-center  border"
                    >
                      Triceps{" "}
                    </Text>
                  </Popover>
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="triceps1"
                    component={({ field }) => (
                      <Input
                        status={errors["triceps1"] && "error"}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="triceps2"
                    component={({ field }) => (
                      <Input
                        status={errors["triceps2"] && "error"}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="triceps3"
                    component={({ field }) => (
                      <Input
                        status={errors["triceps3"] && "error"}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <Popover
                    trigger="hover"
                    placement="bottom"
                    content={() => (
                      <Row>
                        <Col span={6}>
                          <Image
                            height={200}
                            width={200}
                            src={subscapularIllustrator}
                            alt="Subscapular"
                          />
                        </Col>
                        <Col span={18}>
                          <Text>
                            <Text strong>Tips: </Text>
                            Below the tip of the inferior angle of the scapular,
                            at an angle of 45 degrees to vertical (back, just
                            under the shoulder blade). Mark the point just under
                            the shoulder blade halfway between the spine and
                            side. When taking the measurement, the skinfold
                            caliper should be orientated at 45 degrees.
                          </Text>
                        </Col>
                      </Row>
                    )}
                  >
                    <Text
                      style={{
                        padding: "4px 11px",
                        background: colors.black,
                        color: colors.white,
                        fontWeight: "700",
                      }}
                      className="d-block text-center  border"
                    >
                      Subscapular{" "}
                    </Text>
                  </Popover>
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="subscapular1"
                    component={({ field }) => (
                      <Input
                        status={errors["subscapular1"] && "error"}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="subscapular2"
                    component={({ field }) => (
                      <Input
                        status={errors["subscapular2"] && "error"}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="subscapular3"
                    component={({ field }) => (
                      <Input
                        status={errors["subscapular3"] && "error"}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <Popover
                    trigger="hover"
                    placement="bottom"
                    content={() => (
                      <Row>
                        <Col span={6}>
                          <Image
                            height={200}
                            width={200}
                            src={suprailiacIllustrator}
                            alt="Suprailiac"
                          />
                        </Col>
                        <Col span={18}>
                          <Text>
                            <Text strong>Tips: </Text>
                            Above the iliac crest in mid-axillary line (about
                            one inch above the hip bone at an angle of 45
                            degrees to vertical). Mark the point about one inch
                            above the hip bone. When taking the measurement, the
                            skinfold caliper should be orientated at 45 degrees.
                          </Text>
                        </Col>
                      </Row>
                    )}
                  >
                    <Text
                      style={{
                        padding: "4px 11px",
                        background: colors.black,
                        color: colors.white,
                        fontWeight: "700",
                      }}
                      className="d-block text-center  border"
                    >
                      Suprailiac{" "}
                    </Text>
                  </Popover>
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="suprailiac1"
                    component={({ field }) => (
                      <Input
                        status={errors["suprailiac1"] && "error"}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="suprailiac2"
                    component={({ field }) => (
                      <Input
                        status={errors["suprailiac2"] && "error"}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={6}>
                  <FastField
                    required
                    name="suprailiac3"
                    component={({ field }) => (
                      <Input
                        status={errors["suprailiac3"] && "error"}
                        {...field}
                      />
                    )}
                  />
                </Col>
              </Row>
              <Text
                style={{ display: "block", textAlign: "right" }}
                type="danger"
              >
                {Object.keys(errors).length > 0 && "Please fill all the input"}
              </Text>
            </Form>
          );
        }}
      </Formik>
    );
  } else if (activeStep === 1) {
    content = (
      <Formik
        validationSchema={yup.object().shape({
          goal: yup.number().nullable().min(0).required(),
          activityLevel: yup.number().nullable().min(0).required(),
        })}
        initialValues={{
          goal: null,
          activityLevel: null,
        }}
        onSubmit={(e) => {
          formData.current = {
            ...formData.current,
            ...e,
          };
          setActiveStep(activeStep + 1);
          setConfirmLoading(true);
        }}
        innerRef={formRef}
      >
        {(formikProps) => {
          return <GoalDataForm {...formikProps} />;
        }}
      </Formik>
    );
  } else if (activeStep === 2) {
    content = (
      <>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in
          non consequatur ipsa iste dolore illo ratione voluptas voluptatibus.
          Totam praesentium soluta autem fugiat aperiam cum alias. A, ea dicta.
        </Paragraph>
        <Lottie animationData={doneLottie} style={{ height: "400px" }} />
      </>
    );
  }

  return <>{content}</>;
}
