import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import ProductTable from "../ProductTable";
import ItemForm from "../ItemForm";
import * as yup from "yup";
import {
  addProduct,
  editProduct,
  deleteProduct,
} from "../../../redux/slices/prodSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

export default function ProductSide() {
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.prodReducer.listProducts);
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
  const handleAddProduct = async (formData) => {
    let postData = new FormData();
    for (let key in formData) {
      if (key === "imagesFile") {
        for (let image of formData[key]) {
          postData.append("imagesFile", image);
        }
      } else if (!formData[key]) {
      } else postData.append(key, formData[key]);
    }
    const newProduct = await dispatch(addProduct(postData));
    console.log(unwrapResult(newProduct));
  };
  const handleUpdateProduct = async (formData) => {
    let postData = new FormData();
    for (let key in formData) {
      if (key === "imagesFile") {
        for (let image of formData[key]) {
          postData.append("imagesFile", image);
        }
      } else if (!formData[key]) {
      } else postData.append(key, formData[key]);
    }
    await dispatch(editProduct({ postData, id: formData._id }));
  };
  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
  };

  const ManipulateProductModal = (props) => {
    const initialValues = {
      prodName: "",
      prodPrice: 1,
      prodQuantity: 1,
      prodCategory: "",
      prodDescription: "",
      thumbnailFile: "",
      imagesFile: [],
    };
    const validationSchema = yup.object().shape({
      prodName: yup.string().required(),
      prodPrice: yup.number().required(),
      prodQuantity: yup.number().required(),
      prodCategory: yup.string().required(),
      prodDescription: yup.string(),
    });
    const { action, handleAction, show, hide, itemID } = props;
    const [item, setItem] = useState(initialValues);
    const formRef = useRef();

    //Get item by ID to fill all field (For update purpose)
    useEffect(() => {
      if (itemID) {
        const item = listProducts.find((item) => item._id === itemID);
        setItem(item);
      }
    }, [itemID]);

    const handleSubmit = () => {
      if (formRef.current) {
        formRef.current.handleSubmit();
        if (action === "add") setItem(initialValues);
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
          {/* <ListTable list={listProducts} updateModalShow={updateModalShow} /> */}
          <ProductTable
            productList={listProducts}
            updateModalShow={updateModalShow}
            deleteOnClick={handleDeleteProduct}
          />
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
