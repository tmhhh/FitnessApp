import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
export default function AddFoodModal({
  show,
  handleClose,
  handleAddFood,
  mealType,
  setMealType,
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add your food</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select
          onChange={(e) => setMealType(+e.target.value)}
          // value={mealType}
        >
          <option value={0}>Morning</option>
          <option value={1}>Lunch</option>
          <option value={2}>Snack</option>
          <option value={3}>Dinner</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddFood}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
