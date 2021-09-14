import React from "react";
import { Button, Modal } from "react-bootstrap";
export default function CheckoutModal({ showModal, handleCloseModal }) {
  return (
    <Modal centered show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
