import { useRef, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
import { Modal, Steps } from "antd";
import { useDispatch } from "react-redux";
import userApi from "../../../../api/userApi";
import authSlice from "../../../../redux/slices/authSlice";
import "./style.scss";
import TrackingForm from "./TrackingForm";
const { Step } = Steps;
export default function TrackingModal({
  showTrackingModal,
  handleCloseTrackingModal,
  listInputFieldsStep1,
}) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(1);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const formRef = useRef(null);
  const formData = useRef({});

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  const handleTriggerSubmit = () => {
    formRef.current.submitForm();
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

  return (
    <Modal
      title="Tracking Information"
      visible={isModalVisible}
      onOk={handleTriggerSubmit}
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
        setConfirmLoading={setConfirmLoading}
        handleUpdateTrackingInfo={handleUpdateTrackingInfo}
      />
    </Modal>
  );
}
