import { useRef, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
import { Modal, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "redux/slices/authSlice";
import userApi from "../../../../api/userApi";
import "./style.scss";
import TrackingForm from "./TrackingForm";
const { Step } = Steps;
export default function TrackingModal({
  setShowTrackingModal,
  showTrackingModal,
  handleCloseTrackingModal,
}) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const [activeStep, setActiveStep] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(true);
  const formRef = useRef(null);
  const formData = useRef({});

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  const handleTriggerSubmit = () => {
    if (activeStep === 2) return handleUpdateTrackingInfo();
    formRef.current.submitForm();
  };

  const handleCancel = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
    else setShowTrackingModal(false);
  };

  //
  const handleUpdateTrackingInfo = async () => {
    try {
      const updateFormData = { ...formData.current };
      updateFormData.bodyFat = [
        ...(userInfo.trackingInfo.userBodyFat || []),
        {
          data: updateFormData.bodyFat,
        },
      ];

      const res = await userApi.updateTrackingIno(updateFormData);
      console.log({ res });
      if (res.data.isSuccess) {
        handleCloseTrackingModal();
        dispatch(
          authSlice.actions.setAuth({
            authLoading: false,
            isAuthenticated: true,
            userInfo: res.data.updatedUser,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Tracking Information"
      visible={showTrackingModal}
      onOk={handleTriggerSubmit}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      width={800}
      okText={activeStep !== 2 ? "Next" : "Done"}
      cancelText={activeStep > 0 ? "Back" : "Cancel"}
    >
      <Steps className="steps-container" current={activeStep}>
        <Step title="Body Measurements" />
        <Step title="Setup Your Goal" />
        <Step title="Finish" />
      </Steps>
      <TrackingForm
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
