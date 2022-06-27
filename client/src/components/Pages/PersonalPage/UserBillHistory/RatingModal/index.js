import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormReview from "components/Review/FormReview";
export default function RatingModal({
  show: { isShown, prodID },
  handleClose,
}) {
  return (
    <Modal centered show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormReview productId={prodID} />
      </Modal.Body>
    </Modal>
  );
}
