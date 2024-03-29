import { FastField, Field, Form, Formik } from "formik";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as yup from "yup";
import { YT_THUMBNAIL_BASE_URL } from "../../../../assets/constants";
import InputField from "../../../Common/InputField";
import SelectField from "../../../Common/SelectField";
export default function ExerciseForm(props) {
  const { innerRef, handleSubmitAction, action, updatedExerciseRef } = props;
  let initialValues = {
    name: "",
    category: "",
    description: "",
    thumbnail: "",
    muscleActivate: "",
    videoURL: "",
    calories: 50,
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    category: yup.string().required("This field is required"),
    description: yup.string().required("This field is required"),
    thumbnail: yup.string().required("This field is required"),
    muscleActivate: yup.array().required("This field is required"),
    videoURL: yup.string().required("This field is required"),
    calories: yup.number().required("This field is required"),
  });

  if (action === "update") {
    initialValues = {
      ...updatedExerciseRef,
      muscleActivate: updatedExerciseRef.muscleActivate.map((e) => ({
        label: e,
        value: e,
      })),
    };
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => handleSubmitAction(values)}
        validationSchema={validationSchema}
        innerRef={innerRef}
      >
        {(formikProps) => {
          const { values, touched } = formikProps;

          if (values.videoURL !== "" && touched.videoURL) {
            touched.videoURL = false;
            const url = values.videoURL;
            const videoID = url.includes("youtube")
              ? values.videoURL.split("?v=")[1]
              : values.videoURL.split("/")[3];
            formikProps.setFieldValue(
              "thumbnail",
              YT_THUMBNAIL_BASE_URL(videoID)
            );
          }
          return (
            <Form>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <FastField
                    name="name"
                    label="Exercise name"
                    placeholder="Ex: Dumbbell Press,..."
                    required
                    component={InputField}
                  />
                  <FastField
                    name="category"
                    label="Exercise category"
                    placeholder="Ex: Weight training, cardio,..."
                    type="text"
                    required
                    component={InputField}
                  />

                  <FastField
                    name="muscleActivate"
                    isMulti={true}
                    required
                    fieldType={2}
                    placeholder="Group of activated muscles"
                    options={[
                      { value: "Chest", label: "Chest" },
                      { value: "Shoulder", label: "Shoulder" },
                      { value: "Triceps", label: "Triceps" },
                      { value: "Biceps", label: "Biceps" },
                      { value: "Abs", label: "Abs" },
                      { value: "Back", label: "Back" },
                      { value: "Legs", label: "Legs" },
                    ]}
                    component={SelectField}
                  />
                  <FastField
                    label="Calories burned:"
                    required
                    placeholder="..."
                    type="number"
                    name="calories"
                    fieldType={0}
                    component={InputField}
                  />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <FastField
                    name="videoURL"
                    label="Exercise tutorial video"
                    placeholder="Ex: https://youtube.com/example"
                    type="text"
                    required
                    component={InputField}
                  />
                  <Field
                    name="thumbnail"
                    label="Exercise thumbnail"
                    placeholder="Ex: https://example.png"
                    type="text"
                    disabled
                    required
                    fieldType={0}
                    component={InputField}
                  />
                  <FastField
                    label="Exercise description:"
                    required
                    placeholder="..."
                    name="description"
                    fieldType={2}
                    component={InputField}
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
