import { unwrapResult } from "@reduxjs/toolkit";
import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCate,
  deleteCate,
  updateCate,
} from "../../../redux/slices/cateSlice";
import CateModalForm from "./CateModal";
import CateTable from "./CateTable";

export default function CateSide() {
  const dispatch = useDispatch();
  const updatedCateRef = useRef(null);
  const listCate = useSelector((state) => state.cateReducer);
  ///
  const [newModal, setNewModal] = useState({
    isShown: false,
    action: "",
  });

  const newModalShow = (action, _id = null) => {
    if (action === "add")
      setNewModal({ ...newModal, action: "add", isShown: true });
    else {
      updatedCateRef.current = listCate.find((cate) => cate._id === _id);
      setNewModal({ ...newModal, action: "update", isShown: true });
    }
  };
  const newModalClose = () => {
    setNewModal({ ...newModal, isShown: false });
  };

  const handleAddCate = async (formData) => {
    const cateFilterName = formData.cateFilter.split(",");
    const newCate = {
      cateName: formData.cateName,
      cateFilter: [],
    };
    cateFilterName.forEach((e) => {
      newCate.cateFilter.push({ filterName: e });
    });
    const res = await dispatch(addCate(newCate));
    if (unwrapResult(res)) newModalClose();
  };

  ///UPDATE CATE
  const handleUpdateCate = async (formData) => {
    const cateFilterName = formData.cateFilter.split(",");
    const updatingCate = {
      _id: updatedCateRef.current._id,
      cateName: formData.cateName,
      cateFilter: [],
    };
    cateFilterName.forEach((e) => {
      updatingCate.cateFilter.push({ filterName: e });
    });
    const res = await dispatch(updateCate(updatingCate));
    if (unwrapResult(res)) newModalClose();
  };

  ///DELETE CATE
  const handleDeleteCate = async (id) => {
    dispatch(deleteCate(id));
  };

  return (
    <Container className="admin-container mt-5">
      <div className="admin-content">
        <h2 className="admin-content-title">Manage Category</h2>
        <div className="d-flex justify-content-between mt-5">
          <button
            className="common-button floatButton"
            onClick={() => newModalShow("add")}
          >
            <i className="fas fa-plus-circle"></i> New Category
          </button>
        </div>
        <div className="mt-5">
          <CateTable
            listCate={listCate}
            updateModalShow={newModalShow}
            deleteOnClick={handleDeleteCate}
          />
        </div>
      </div>

      <CateModalForm
        action={newModal.action}
        handleSubmitAction={
          newModal.action === "add" ? handleAddCate : handleUpdateCate
        }
        show={newModal.isShown}
        updatedCateRef={updatedCateRef.current}
        hide={newModalClose}
      />
    </Container>
  );
}
