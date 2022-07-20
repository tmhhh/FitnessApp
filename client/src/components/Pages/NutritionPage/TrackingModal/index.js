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
  listInputFieldsStep1,
}) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const formRef = useRef(null);
  const formData = useRef({});

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
        <Step title="Body Measurements" />
        <Step title="Setup Your Goal" />
        <Step title="Finish" />
      </Steps>
      <TrackingForm
        listInputFieldsStep1={listInputFieldsStep1}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        formRef={formRef}
        formData={formData}
        handleUpdateTrackingInfo={handleUpdateTrackingInfo}
      />
    </Modal>
  );
}
