import { Modal, Button } from "react-bootstrap";
import React from "react";

export default function ConfirmModal({
  show,
  handleClose,
  handleConfirm,
  heading,
  body,
}) {
  const defaultConfirmMessage = (
      <>
        <h1><i className="fas fa-dumbbell"></i> Are you sure ?</h1>
      </>
  );

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body || defaultConfirmMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
