import { Form, Modal } from "react-bootstrap";
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
        <button
          className="common-button common-button-grey"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="common-button common-button-green"
          onClick={handleAddFood}
        >
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
}
