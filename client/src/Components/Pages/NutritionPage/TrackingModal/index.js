import { useState, useRef } from "react";
// import { Modal, Button } from "react-bootstrap";
import { Modal } from "antd";
import TrackingForm from "./TrackingForm";
import userApi from "../../../../api/userApi";
import authSlice from "../../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Steps } from "antd";
import "./style.scss";
const { Step } = Steps;
export default function TrackingModal({
  showTrackingModal,
  handleCloseTrackingModal,
}) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const formRef = useRef(null);
  const formData = useRef({});
  let action = null;
  const [isModalVisible, setIsModalVisible] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  if (activeStep === 0 || activeStep === 1) action = "Next";
  else action = "Save Changes";

  //
  const handleUpdateTrackingInfo = async () => {
    try {
      console.log(formData.current);
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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //
  const handleStep = () => {
    formRef.current.submitForm();
  };
  return (
    // <Modal centered show={showTrackingModal}>
    //   <Steps current={1}>
    //     <Step title="Finished" description="This is a description." />
    //     <Step
    //       title="In Progress"
    //       subTitle="Left 00:00:08"
    //       description="This is a description."
    //     />
    //     <Step title="Waiting" description="This is a description." />
    //   </Steps>
    //   <Modal.Header>
    //     <Modal.Title>Tracking Info</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <TrackingForm
    //       activeStep={activeStep}
    //       setActiveStep={setActiveStep}
    //       formRef={formRef}
    //       formData={formData}
    //       handleUpdateTrackingInfo={handleUpdateTrackingInfo}
    //     />
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="primary" onClick={handleStep}>
    //       {action}
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
    <Modal
      title="Tracking Information"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      width={800}
    >
      <Steps className="steps-container" current={1}>
        <Step title="Personal Data" />
        <Step title="Setup Your Goal" />
        <Step title="Finish" />
      </Steps>
      <TrackingForm
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        formRef={formRef}
        formData={formData}
        handleUpdateTrackingInfo={handleUpdateTrackingInfo}
      />
    </Modal>
  );
}
