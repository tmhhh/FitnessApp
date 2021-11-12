import { FastField, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import DatePickerField from "../../../Common/DatePickerField";
import InputField from "../../../Common/InputField";
import SelectField from "../CateField";
export default function VoucherForm({ listCate, handleAddVoucher }) {
  const date = new Date().toLocaleDateString();

  //INITIAL VALUES
  const initialValues = {
    vouQuantity: 0,
    vouExpired: new Date(),
    vouCode: "",
    vouDiscount: 0,
    // cateID: "",
  };

  // VALIDATION SCHEMA
  const validationSchema = yup.object().shape({
    vouQuantity: yup
      .number()
      .required("This field is required")
      .nullable()
      .moreThan(0, "Quantity must be larger than 0"),
    vouExpired: yup
      .date()
      .required("This field is required")
      .min(date, "Expired day must be larger than " + date),
    vouCode: yup.string().required("This field is required"),
    vouDiscount: yup
      .number()
      .required("This field is required")
      .nullable()
      .moreThan(0, "Discount value must be larger than 0"),
    // cateID: yup.string().required("This field is required").nullable(),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleAddVoucher(values)}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        // console.log({ errors }, { touched });
        //HANDLE GENERATE CODE
        const handleGenerateCode = () => {
          const code = nanoid(10);
          formikProps.setFieldValue("vouCode", code);
          // console.log(formikProps.values);
        };
        return (
          <Form>
            <FastField
              name="vouCode"
              placeholder="Voucher code string ..."
              disabled={true}
              label="Code string"
              component={InputField}
            />
            <FastField
              name="vouDiscount"
              required
              type="number"
              label="Code discount value (%) "
              component={InputField}
              // min={1}
            />
            <FastField
              name="vouQuantity"
              required
              type="number"
              label="Number of discount  "
              component={InputField}
              // min={1}
            />
            <FastField
              name="vouExpired"
              label="Expired Date"
              required
              component={DatePickerField}
              // minDate={date}
            />
            {/* <FastField
              label="Choose category "
              required
              placeholder="List Of Categories ..."
              name="cateID"
              fieldType={0}
              component={SelectField}
              options={listCate}
            /> */}
            <div
              style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "flex-end",
              }}
              className="action_buttons"
            >
              <Button onClick={handleGenerateCode} variant="primary">
                Generate
              </Button>
              <Button
                type="submit"
                style={{ marginLeft: "10px" }}
                variant="dark"
              >
                Save Voucher
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
