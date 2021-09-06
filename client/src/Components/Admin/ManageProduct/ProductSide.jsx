import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import ListTable from "../ListTable";
import ItemForm from "../ItemForm";
import * as yup from "yup";

export default function ProductSide() {
  const [newModal, setNewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState({ show: false, itemID: "" });

  const newModalShow = () => {
    setNewModal(true);
  };
  const newModalClose = () => {
    setNewModal(false);
  };
  const updateModalShow = (e) => {
    setUpdateModal({
      show: true,
      itemID: e.target.getAttribute("itemID"),
    });
  };
  const updateModalClose = () => {
    setUpdateModal({
      ...updateModal,
      show: false,
    });
  };
  const handleAddProduct = (formData) => {
    console.log(formData);
  };
  const handleUpdateProduct = (formData) => {
    console.log(formData);
  };

  const ManipulateProductModal = (props) => {
    const initialValues = {
      name: "",
      price: 1,
      quantity: 1,
      category: "",
      description: "",
      thumbnailFile: "",
      imagesFile: [],
    };
    const validationSchema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      quantity: yup.number().required(),
      category: yup.string().required(),
      description: yup.string(),
    });
    const { action, handleAction, show, hide, itemID } = props;
    const [item, setItem] = useState({ initialValues });
    const formRef = useRef();

    //Get item by ID to fill all field (For update purpose)
    useEffect(() => {
      if (itemID) setItem(null);
    }, [itemID]);

    const handleSubmit = () => {
      if (formRef.current) {
        formRef.current.handleSubmit();
      }
    };
    return (
      <Modal show={show} onHide={hide} centered>
        <Modal.Header closeButton>
          {action === "add" ? (
            <Modal.Title>Add new item 🗃</Modal.Title>
          ) : (
            <Modal.Title>Change item 🛠</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <ItemForm
            innerRef={formRef}
            onSubmit={handleAction}
            initialValues={item}
            validationSchema={validationSchema}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={hide}>
            Close
          </Button>
          {action === "add" ? (
            <Button variant="dark" onClick={handleSubmit}>
              Add 📥
            </Button>
          ) : (
            <Button variant="dark" onClick={handleSubmit}>
              Update 🔧
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
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
          <ListTable updateModalShow={updateModalShow} />
        </div>
      </div>
      <ManipulateProductModal
        action={"update"}
        handleAction={handleUpdateProduct}
        show={updateModal.show}
        hide={updateModalClose}
        itemID={updateModal.itemID}
      />
      <ManipulateProductModal
        action={"add"}
        handleAction={handleAddProduct}
        show={newModal}
        hide={newModalClose}
      />
    </Container>
  );
}
