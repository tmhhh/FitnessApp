import React, { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import ListTable from "./ListTable";
import NewItemForm from "./NewItemForm";

export default function ProductSide() {
  const [newModal, setNewModal] = useState(false);

  const newModalShow = () => {
    setNewModal(true);
  };
  const newModalClose = () => {
    setNewModal(false);
  };

  return (
    <Container className="admin-container mt-5">
      <div className="admin-content">
        <h2 className="admin-content-title">Manage Product</h2>
        <div className="d-flex justify-content-between mt-5">
          <Button variant="dark" className="myButton" onClick={newModalShow}>
            {" "}
            🆕 New item
          </Button>
          <Button variant="success" className="myButton" color="light">
            {" "}
            🧩 Categories
          </Button>
        </div>
        <div className="mt-5">
          <ListTable />
        </div>
      </div>

      <Modal show={newModal} onHide={newModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewItemForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={newModalClose}>
            Close
          </Button>
          <Button variant="dark" onClick={newModalClose}>
            Add 📥
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
