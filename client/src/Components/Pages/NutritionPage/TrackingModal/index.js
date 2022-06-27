import { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import TrackingForm from "./TrackingForm";
import userApi from "../../../../api/userApi";
import authSlice from "../../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
export default function TrackingModal({
  showTrackingModal,
  handleCloseTrackingModal,
}) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const formRef = useRef(null);
  const formData = useRef({});
  let action = null;
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
    <Modal centered show={showTrackingModal}>
      <Modal.Header>
        <Modal.Title>Tracking Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TrackingForm
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          formRef={formRef}
          formData={formData}
          handleUpdateTrackingInfo={handleUpdateTrackingInfo}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="common-button common-button-blue" onClick={handleStep}>
          {action}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
