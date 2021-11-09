import { Button, Container, Modal } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import CateForm from "../ExerciseForm";
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
            <Button variant="dark" onClick={triggerFormikSubmit}>
              Add 📥
            </Button>
            <Button variant="danger" onClick={hide}>
              Close
            </Button>
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
            <Button variant="dark" onClick={triggerFormikSubmit}>
              Update 🔧
            </Button>
            <Button variant="danger" onClick={hide}>
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
