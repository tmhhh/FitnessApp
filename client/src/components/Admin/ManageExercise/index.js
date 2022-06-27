import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ExerciseTable from "./ExerciseTable";
import ExerciseModalForm from "./ExerciseModal";
import {
  addExercise,
  deleteExercise,
  updateExercise,
} from "../../../redux/slices/exerciseSlice";
import messageAntd, { messageTypes } from "components/Common/Toast/message";

export default function ExerciseSide() {
  const { listExercises } = useSelector((state) => state.exerciseReducer);
  const dispatch = useDispatch();
  const updatedExerciseRef = useRef(null);
  ///
  const [newModal, setNewModal] = useState({
    isShown: false,
    action: "",
  });

  const newModalShow = (action, _id = null) => {
    if (action === "add")
      setNewModal({ ...newModal, action: "add", isShown: true });
    else {
      updatedExerciseRef.current = listExercises.find(
        (Exercise) => Exercise._id.toString() === _id.toString()
      );
      setNewModal({ ...newModal, action: "update", isShown: true });
    }
  };
  const newModalClose = () => {
    setNewModal({ ...newModal, isShown: false });
  };

  const handleAddExercise = async (formData) => {
    try {
      const newExercise = {
        ...formData,
        muscleActivate: formData.muscleActivate.map((e) => e.value),
      };

      const res = await dispatch(addExercise(newExercise));
      if (unwrapResult(res)) {
        messageAntd(messageTypes.success, "Add successfully ");
        newModalClose();
      }
    } catch (error) {
      messageAntd(messageTypes.error, "Please try again later");
    }
  };

  ///UPDATE Exercise
  const handleUpdateExercise = async (formData) => {
    try {
      const updatingExercise = {
        ...formData,
        muscleActivate: formData.muscleActivate.map((e) => e.value),
      };
      console.log({ updatingExercise });
      const res = await dispatch(updateExercise(updatingExercise));
      if (unwrapResult(res)) {
        messageAntd(messageTypes.success, "Update successfully ");

        newModalClose();
      }
    } catch (error) {
      messageAntd(messageTypes.error, "Please try again later");
    }
  };

  ///DELETE Exercise
  const handleDeleteExercise = async (id) => {
    try {
      const res = await dispatch(deleteExercise(id));
      if (unwrapResult(res)) {
        messageAntd(messageTypes.success, "Delete successfully ");
      }
    } catch (error) {
      messageAntd(messageTypes.error, "Please try again later");
    }
  };

  return (
    <Container className="admin-container mt-5">
      <div className="admin-content">
        <h2 className="admin-content-title">Manage Exercise</h2>
        <div className="d-flex justify-content-between mt-5">
          <button
            className="common-button floatButton"
            onClick={() => newModalShow("add")}
          >
            <i className="fas fa-plus-circle"></i> New Exercise
          </button>
        </div>
        <div className="mt-5">
          <ExerciseTable
            listExercises={listExercises}
            updateModalShow={newModalShow}
            deleteOnClick={handleDeleteExercise}
          />
        </div>
      </div>

      <ExerciseModalForm
        action={newModal.action}
        handleSubmitAction={
          newModal.action === "add" ? handleAddExercise : handleUpdateExercise
        }
        show={newModal.isShown}
        updatedExerciseRef={updatedExerciseRef.current}
        hide={newModalClose}
      />
    </Container>
  );
}
