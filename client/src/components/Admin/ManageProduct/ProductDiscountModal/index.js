import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

export default function ProductDiscountMdal({
  discountModal: { isShown, product },
  handleClose,
  handleAddDiscount,
  handleResetDiscount,
  handleStartTimeChange,
  startTime,
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const handleOnClick = () => {
    if (input.trim() === "") return setError("Please input percent");
    const percent = input.split("-");
    if (percent.length > 1) return setError("The percent must larger than 1");
    if (parseFloat(input) > 100)
      return setError("The percent must less than 100");

    handleAddDiscount(product._id, input);
    setInput("");
  };

  return (
    <Modal centered show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Discount Setting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Choose Product ID:</Form.Label>
          <Form.Control disabled type="text" value={product?._id} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Choose Product Name:</Form.Label>
          <Form.Control disabled type="text" value={product?.prodName} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Discount Percentage (%):</Form.Label>
          <Form.Control
            min={1}
            max={100}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="number"
            placeholder="Ex: 20.5"
          />
          <Form.Text style={{ color: "red", fontSize: "1.3rem" }}>
            {error && error}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Choose Start Date:</Form.Label>

          <DatePicker
            minDate={new Date()}
            // startDate={new Date()}
            onChange={handleStartTimeChange}
            showTimeSelect
            selected={startTime}
            // className="w-100"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {product?.prodDiscount?.isDiscounted ? (
          <button
            onClick={() => handleResetDiscount(product._id)}
            className="common-button common-button-blue"
          >
            Reset Discount
          </button>
        ) : (
          <button
            className="common-button common-button-red"
            onClick={handleClose}
          >
            Close
          </button>
        )}

        <button onClick={handleOnClick} className="common-button">
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
}
