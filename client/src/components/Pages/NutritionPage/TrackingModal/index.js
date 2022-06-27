import { useState, useRef } from "react";
// import { Modal, Button } from "react-bootstrap";
import { Modal } from "antd";
import TrackingForm from "./TrackingForm";
import userApi from "../../../../api/userApi";
import authSlice from "../../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Steps, Radio } from "antd";
import "./style.scss";
import InputField from "components/Common/InputField";
const { Step } = Steps;
export default function TrackingModal({
  showTrackingModal,
  handleCloseTrackingModal,
}) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(2);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const formRef = useRef(null);
  const formData = useRef({});
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
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  const handleOk = () => {
    handleStep();
    if (activeStep === 0) {
      setConfirmLoading(true);
    }
    if (activeStep < 3) setActiveStep(activeStep + 1);
    else setIsModalVisible(false);
  };

  const handleCancel = () => {
    if (activeStep !== 0) setActiveStep(activeStep - 1);
    else setIsModalVisible(false);
  };

  //
  const handleUpdateTrackingInfo = async () => {
    try {
      const res = await userApi.updateTrackingIno(formData.current);
      if (res.data.isSuccess) {
        dispatch(
          authSlice.actions.setAuth({
            authLoading: false,
            isAuthenticated: true,
            userInfo: res.data.updatedUser,
          })
        );
        handleCloseTrackingModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //
  const handleStep = () => {
    formRef.current.submitForm();
  };
  return (
    <Modal
      title="Tracking Information"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      width={800}
      okText={activeStep < 3 ? "Next" : "Done"}
      cancelText={activeStep > 0 ? "Back" : "Cancel"}
    >
      <Steps className="steps-container" current={1}>
        <Step title="Personal Data" />
        <Step title="Setup Your Goal" />
        <Step title="Finish" />
      </Steps>
      <TrackingForm
        listInputFields={listInputFields}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        formRef={formRef}
        formData={formData}
        handleUpdateTrackingInfo={handleUpdateTrackingInfo}
      />
    </Modal>
  );
}
