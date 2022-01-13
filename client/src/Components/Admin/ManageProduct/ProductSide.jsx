import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ProductDiscountModal from "./ProductDiscountModal";
import * as yup from "yup";
import {
  addDiscount,
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  resetDiscount,
} from "../../../redux/slices/prodSlice";
import { Context } from "Contexts";
import ItemForm from "../ItemForm";
import ProductTable from "../ProductTable";
import Pagination from "../../Common/Pagination/Pagination";

export default function ProductSide(props) {
  const { setToast } = useContext(Context);
  const history = useHistory();
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.prodReducer.listProducts);
  const [newModal, setNewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState({ show: false, item: "" });

  // console.log({ listProducts });
  const handlePageChange = (options) => {
    dispatch(getProduct(options));
  };

  const totalPages = useSelector((state) => state.prodReducer.totalPages);

  const newModalShow = () => {
    setNewModal(true);
  };
  const newModalClose = () => {
    setNewModal(false);
  };
  const updateModalShow = (e) => {
    const item = listProducts.find(
      (prod) => prod._id === e.target.getAttribute("itemID").toString()
    );
    console.log({ item });
    setUpdateModal({
      show: true,
      item,
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
    await dispatch(addProduct(postData));
    setToast({
      toastShow: true,
      title: "Add successfully",
      content: "Keep gooingggg",
      icon: "✔",
      bg: "success",
    });
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
    console.log({ formData });
    await dispatch(editProduct({ postData, id: formData._id }));
    setToast({
      toastShow: true,
      title: "Update successfully",
      content: "Keep gooingggg",
      icon: "✔",
      bg: "success",
    });
  };
  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    setToast({
      toastShow: true,
      title: "Delete successfully",
      content: "Keep gooingggg",
      icon: "✔",
      bg: "success",
    });
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
    const { action, handleAction, show, hide, chosenItem } = props;
    const [item, setItem] = useState(initialValues);
    const formRef = useRef();

    //Get item by ID to fill all field (For update purpose)
    // useEffect(() => {
    //   if (itemID) {
    //     const item = listProducts.find((item) => item._id === itemID);
    //     console.log({ item });
    //     setItem(item);

    //   }
    // }, [itemID]);

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
            action={action}
            innerRef={formRef}
            onSubmit={handleAction}
            initialValues={chosenItem}
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

  //DISCOUNT MODAL
  const [discountModal, setProdDiscountModal] = useState({
    isShown: false,
    product: null,
  });

  const handleShowProductDiscountModal = (product) => {
    setProdDiscountModal({ isShown: true, product });
  };
  const handleCloseProductDiscountModal = () => {
    setProdDiscountModal({ ...discountModal, isShown: false });
  };
  const handleAddDiscount = async (prodID, discountPercent) => {
    try {
      console.log(typeof startTime);
      console.log(startTime);

      const res = await dispatch(
        addDiscount({ prodID, discountPercent, startDate: startTime })
      );
      if (unwrapResult(res)) handleCloseProductDiscountModal();
    } catch (error) {
      console.log("ngoai");
      console.log({ error });
    }
  };
  const handleResetDiscount = async (prodID) => {
    try {
      const res = await dispatch(resetDiscount(prodID));
      if (unwrapResult(res)) handleCloseProductDiscountModal();
    } catch (error) {
      console.log({ error });
    }
  };

  //START TIME
  const [startTime, setStartTime] = useState(new Date());
  const handleStartTimeChange = (e) => {
    setStartTime(e);
  };
  return (
    <Container className="admin-container mt-5">
      <div className="admin-content">
        <h2 className="admin-content-title">Manage Product</h2>
        <div className="d-flex justify-content-between mt-5">
          <Button variant="dark" className="myButton" onClick={newModalShow}>
            🆕 New item
          </Button>
          <Button
            onClick={() => history.push("/admin/category")}
            variant="success"
            className="myButton"
            color="light"
          >
            🧩 Categories
          </Button>
        </div>
        <div className="mt-5">
          {/* <ListTable list={listProducts} updateModalShow={updateModalShow} /> */}
          <ProductTable
            handleShowProductDiscountModal={handleShowProductDiscountModal}
            productList={listProducts}
            updateModalShow={updateModalShow}
            deleteOnClick={handleDeleteProduct}
          />
        </div>
        <Pagination
          numOfPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      <ManipulateProductModal
        action={"update"}
        handleAction={handleUpdateProduct}
        show={updateModal.show}
        hide={updateModalClose}
        chosenItem={updateModal.item}
      />
      <ManipulateProductModal
        action={"add"}
        handleAction={handleAddProduct}
        show={newModal}
        hide={newModalClose}
      />
      <ProductDiscountModal
        discountModal={discountModal}
        handleAddDiscount={handleAddDiscount}
        handleResetDiscount={handleResetDiscount}
        handleClose={handleCloseProductDiscountModal}
        handleStartTimeChange={handleStartTimeChange}
        startTime={startTime}
      />
    </Container>
  );
}
