import {Modal} from "react-bootstrap";
import React, {useRef} from "react";
import CateForm from "../CateForm";

export default function CateModalForm(props) {
  const { action, handleSubmitAction, show, hide, updatedCateRef } = props;
  const formRef = useRef();

  const triggerFormikSubmit = () => {
    // console.log({ formRef });

    //TRIGGER FORMIK SUBMIT
    formRef.current.handleSubmit();
  };
  return (
    <Modal show={show} onHide={hide} centered>
      {action === "add" ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Add New Category 🗃</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CateForm
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
            <Modal.Title>Update Category 🛠</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CateForm
              innerRef={formRef}
              handleSubmitAction={handleSubmitAction}
              updatedCateRef={updatedCateRef}
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
