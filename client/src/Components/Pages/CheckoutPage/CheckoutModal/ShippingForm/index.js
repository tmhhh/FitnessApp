import { Form, Formik, FastField, Field } from "formik";
import * as yup from "yup";
import SelectField from "../../../../Common/SelectField";
import InputField from "../../../../Common/InputField";
import CheckField from "../../../../Common/CheckField";
import { address_API_config } from "../../../../../assets/constants";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

export default function ShippingForm({
  provincesData,
  wardsData,
  districtsData,
  addressData,
  setAddressData,
  handleOnSubmit,
  formRef,
}) {
  //
  const initialValues = {
    province: 0,
    district: 0,
    ward: 0,
    phoneNumber: "",
    apartmentNumber: "",
    paymentMethod: "",
  };

  //
  const validationSchema = yup.object().shape({
    province: yup
      .number()
      .min(1, "Please choose your province")
      .required("This field is required"),
    district: yup
      .number()
      .min(1, "Please choose your district")
      .required("This field is required"),
    ward: yup
      .number()
      .min(1, "Please choose your ward")
      .required("This field is required"),
    phoneNumber: yup
      .string()
      .min(10, "Phone number is not in correct format")
      .max(12, "Phone number is not in correct format")
      .required("This field is required"),
    apartmentNumber: yup.string().required("This field is required"),
    // paymentMethod: yup.string().required("This field is required"),
    paymentMethod: yup.object().required("This field is required"),
  });
  return (
    <Formik
      onSubmit={(values) => handleOnSubmit(values)}
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={formRef}
    >
      {(formikProps) => {
        const { values, touched } = formikProps;
        // console.log(values);
        const getDistrictsByProvinceID = async () => {
          try {
            const res = await axios.get(address_API_config.districts_API_URL, {
              headers: {
                token: address_API_config.token,
              },
              params: {
                province_id: parseInt(values.province),
              },
            });
            // console.log(res.data);
            setAddressData({ ...addressData, districtsData: res.data.data });
          } catch (error) {
            console.log(error);
          }
        };

        //
        const getWardsByDistrictID = async () => {
          try {
            const res = await axios.get(address_API_config.ward_API_URL, {
              headers: {
                token: address_API_config.token,
              },
              params: {
                district_id: parseInt(values.district),
              },
            });
            // console.log(res.data.data);
            setAddressData({ ...addressData, wardsData: res.data.data || [] });
          } catch (error) {
            console.log(error);
          }
        };

        if (parseInt(values.province) !== 0 && touched.province === true) {
          // VAN DE
          // touched.province = false;
          formikProps.setFieldTouched("province", false);

          console.log("province change" + values.province);
          getDistrictsByProvinceID();
        }
        if (parseInt(values.district) !== 0 && touched.district === true) {
          // touched.district = false;
          formikProps.setFieldTouched("district", false);
          console.log("district change" + values.district);

          getWardsByDistrictID();
        }

        return (
          <Form>
            <Container>
              <Row>
                <Col md={6} xs={12}>
                  <FastField
                    placeholder="Ex: xxx xxx xxx ..."
                    label="Phone Number"
                    required
                    name="phoneNumber"
                    component={InputField}
                  />
                  <FastField
                    required
                    label="Shipping Address"
                    name="province"
                    optionDefaultName="Province/City"
                    options={provincesData.map((e) => ({
                      value: parseInt(e.ProvinceID),
                      name: e.ProvinceName,
                    }))}
                    fieldType={1}
                    component={SelectField}
                    disabled={false}
                  />
                  <FastField
                    // label="Checkout Method"
                    placeholder="Choose your payment method "
                    required
                    name="paymentMethod"
                    isMulti={false}
                    component={SelectField}
                    options={[
                      {
                        value: "COD",
                        label: (
                          <div className="option-container d-flex justify-content-between align-items-center">
                            <p className="option-label">COD</p>
                            <img
                              height="30"
                              width="30"
                              src="https://printgo.vn/uploads/file-logo/1/512x512.e1267ccd23435225c187a0d29782afe2.ai.1.png"
                              alt="cod"
                            />
                          </div>
                        ),
                      },
                      {
                        value: "PAYPAL",
                        label: (
                          <div className="option-container d-flex justify-content-between align-items-center">
                            <p className="option-label">PAYPAL</p>
                            <img
                              height="30"
                              width="30"
                              src="https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015__480.png"
                              alt="paypal"
                            />
                          </div>
                        ),
                      },
                      {
                        value: "VNPAY",
                        label: (
                          <div className="option-container d-flex justify-content-between align-items-center">
                            <p className="option-label">VNPAY</p>
                            <img
                              height="30"
                              width="30"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnadRexyJp2rdd1dgEOx5TyDR88D2qA6t0aUrQhHDVudHbRx6U3petkwc-nj9MFPvBxyw&usqp=CAU"
                              alt="cod"
                            />
                          </div>
                        ),
                      },
                    ]}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Field
                    required
                    name="district"
                    optionDefaultName="District"
                    options={
                      parseInt(values.province) !== 0
                        ? districtsData.map((district) => ({
                            value: district.DistrictID,
                            name: district.DistrictName,
                          }))
                        : []
                    }
                    fieldType={0}
                    disabled={+values.province === 0 ? true : false}
                    component={SelectField}
                  />

                  <Field
                    required
                    name="ward"
                    options={
                      values.district !== 0
                        ? wardsData.map((e) => ({
                            value: parseInt(e.WardCode),
                            name: e.WardName,
                          }))
                        : []
                    }
                    disabled={+values.district === 0 && true}
                    optionDefaultName="Ward ..."
                    component={SelectField}
                    fieldType={0}
                  />
                  <FastField
                    required
                    label="Apartment Number"
                    placeholder="Your home number"
                    name="apartmentNumber"
                    component={InputField}
                  />
                  {/* <FastField
              type="checkbox"
              required
              name="paymentMethod"
              checkLabel={["COD", "OTHERS"]}
              subCheckLabel={[
                <img
                  height="60"
                  width="60"
                  src="https://printgo.vn/uploads/file-logo/1/512x512.e1267ccd23435225c187a0d29782afe2.ai.1.png"
                  alt="cod"
                  className="mb-3"
                />,
                <img
                  className="mb-3"
                  height="60"
                  width="60"
                  src="https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015__480.png"
                  alt="paypal"
                />,
              ]}
              label="Payment Method"
              component={CheckField}
            /> */}
                </Col>
              </Row>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
}
