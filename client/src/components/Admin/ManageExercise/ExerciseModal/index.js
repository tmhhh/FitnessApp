import React, {useRef} from "react";
import {Modal} from "react-bootstrap";
import ExerciseForm from "../ExerciseForm";

export default function ExerciseModalForm(props) {
  const { action, handleSubmitAction, show, hide, updatedExerciseRef } = props;
  const formRef = useRef();

  const triggerFormikSubmit = () => {
    //TRIGGER FORMIK SUBMIT
    formRef.current.handleSubmit();
  };
  return (
    <Modal size="lg" show={show} onHide={hide} centered>
      {action === "add" ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Add New Exercise 🗃</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExerciseForm
              innerRef={formRef}
              handleSubmitAction={handleSubmitAction}
              action="add"
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="common-button floatButton" onClick={triggerFormikSubmit}>
              Add 📥
            </button>
            <button className="common-button common-button-red floatButton" onClick={hide}>
              Close
            </button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Update Exercise 🛠</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExerciseForm
              innerRef={formRef}
              handleSubmitAction={handleSubmitAction}
              updatedExerciseRef={updatedExerciseRef}
              action="update"
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="common-button floatButton" onClick={triggerFormikSubmit}>
              Update 🔧
            </button>
            <button className="common-button common-button-red floatButton" onClick={hide}>
              Close
            </button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
