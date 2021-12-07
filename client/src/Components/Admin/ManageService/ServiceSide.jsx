import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as yup from "yup";
import {
  addService,
  deleteService,
  editService,
} from "../../../redux/slices/serviceSlice";
import ItemForm from "./ServiceForm";
import ServiceTable from "./ServiceTable";
export default function ServiceSide(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const listServices = useSelector((state) => state.serviceReducer.list);
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
  const handleAddService = async (formData) => {
    let postData = new FormData();
    for (let key in formData) {
      if (key === "imagesFile") {
        for (let image of formData[key]) {
          postData.append("imagesFile", image);
        }
      } else if (!formData[key]) {
      } else postData.append(key, formData[key]);
    }
    await dispatch(addService(postData));
  };
  const handleUpdateService = async (formData) => {
    let postData = new FormData();
    for (let key in formData) {
      if (key === "imagesFile") {
        for (let image of formData[key]) {
          postData.append("imagesFile", image);
        }
      } else if (!formData[key]) {
      } else postData.append(key, formData[key]);
    }
    await dispatch(editService({ postData, id: formData._id }));
  };
  const handleDeleteService = async (id) => {
    await dispatch(deleteService(id));
  };

  const ManipulateServiceModal = (props) => {
    const initialValues = {
      name: "",
      vendor: "",
      slot: 1,
      price: 1,
      description: "",
      thumbnailFile: "",
      imagesFile: [],
    };
    const validationSchema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      vendor: yup.string().required(),
      slot: yup.number().required(),
      description: yup.string(),
    });
    const { action, handleAction, show, hide, itemID } = props;
    const [item, setItem] = useState(initialValues);
    const formRef = useRef();

    //Get item by ID to fill all field (For update purpose)
    useEffect(() => {
      if (itemID) {
        const item = listServices.find((item) => item._id === itemID);
        setItem(item);
      }
    }, [itemID]);

    const handleSubmit = () => {
      if (formRef.current) {
        formRef.current.handleSubmit();
        if (action === "add") {
          setItem(initialValues);
        }
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
        <h2 className="admin-content-title">Manage Service</h2>
        <div className="d-flex justify-content-between mt-5">
          <Button variant="dark" className="myButton" onClick={newModalShow}>
            🆕 New item
          </Button>
        </div>
        <div className="mt-5">
          {/* <ListTable list={listServices} updateModalShow={updateModalShow} /> */}
          <ServiceTable
            list={listServices}
            updateModalShow={updateModalShow}
            deleteOnClick={handleDeleteService}
          />
        </div>
      </div>
      <ManipulateServiceModal
        action={"update"}
        handleAction={handleUpdateService}
        show={updateModal.show}
        hide={updateModalClose}
        itemID={updateModal.itemID}
      />
      <ManipulateServiceModal
        action={"add"}
        handleAction={handleAddService}
        show={newModal}
        hide={newModalClose}
      />
    </Container>
  );
}
