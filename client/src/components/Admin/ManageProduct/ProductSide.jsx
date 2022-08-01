import { unwrapResult } from "@reduxjs/toolkit";
import messageAntd, { messageTypes } from "components/Common/Toast/message";
import { useRef, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as yup from "yup";
import {
  addDiscount,
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  resetDiscount,
} from "../../../redux/slices/prodSlice";
import Pagination from "../../Common/Pagination/Pagination";
import ItemForm from "../ItemForm";
import ProductTable from "../ProductTable";
import ProductDiscountModal from "./ProductDiscountModal";

export default function ProductSide(props) {
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
    newModalClose();
    messageAntd(messageTypes.success, "Add successfully ");
  };
  const handleUpdateProduct = async (formData) => {
    let postData = new FormData();
    for (let key in formData) {
      console.log(key);
      console.log(formData[key]);
      if (key === "imagesFile") {
        for (let image of formData[key]) {
          postData.append("imagesFile", image);
        }
      } else if (key === "prodRating" || key === "prodDiscount") {
        postData.append(key, JSON.stringify(formData[key]));
      } else {
        // console.log({ key } + formData[key]);
        postData.append(key, formData[key]);
      }
    }
    await dispatch(editProduct({ postData, id: formData._id }));
    updateModalClose();
    messageAntd(messageTypes.success, "Update successfully ");
  };
  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    messageAntd(messageTypes.success, "Delete successfully ");
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
          <button className="common-button floatButton" onClick={newModalShow}>
            <i className="fas fa-plus-circle"></i> New item
          </button>
          <button
            onClick={() => history.push("/admin/category")}
            className="common-button common-button-green floatButton"
            color="light"
            style={{ backgroundColor: "#2bc748", border: "none" }}
          >
            <i className="fas fa-puzzle-piece"></i> Categories
          </button>
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
const ManipulateProductModal = (props) => {
  const initialValues = {
    prodName: "",
    prodPrice: 1,
    prodQuantity: 1,
    prodCategory: "",
    prodDescription: "",
    thumbnailFile: "",
    // imagesFile: [],
  };
  const validationSchema = yup.object().shape({
    prodName: yup.string().required(),
    prodPrice: yup.number().required(),
    prodQuantity: yup.number().required(),
    prodCategory: yup.string().required(),
    prodDescription: yup.string(),
  });
  const { action, handleAction, show, hide, chosenItem } = props;
  const formRef = useRef();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
      // if (action === "add") setItem(initialValues);
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
        <button
          className="common-button common-button-red floatButton"
          onClick={hide}
        >
          Close
        </button>
        {action === "add" ? (
          <button className="common-button floatButton" onClick={handleSubmit}>
            Add 📥
          </button>
        ) : (
          <button className="common-button floatButton" onClick={handleSubmit}>
            Update 🔧
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
