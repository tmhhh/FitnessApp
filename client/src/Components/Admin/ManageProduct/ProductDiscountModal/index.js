import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
export default function ProductDiscountMdal({
  discountModal: { isShown, product },
  handleClose,
  handleAddDiscount,
  handleResetDiscount,
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const handleOnClick = () => {
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
          <Form.Label>Chosen Product ID:</Form.Label>
          <Form.Control disabled type="text" value={product?._id} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Chosen Product Name:</Form.Label>
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
      </Modal.Body>
      <Modal.Footer>
        {product?.prodDiscount?.isDiscounted ? (
          <Button
            onClick={() => handleResetDiscount(product._id)}
            variant="danger"
          >
            Reset Discount
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        )}

        <Button onClick={handleOnClick} variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
