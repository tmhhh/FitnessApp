import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useRef, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ExerciseTable from "./ExerciseTable";
import ExerciseModalForm from "./ExerciseModal";
import {
  addExercise,
  deleteExercise,
  updateExercise,
} from "../../../redux/slices/exerciseSlice";
import { Context } from "../../../Contexts";

export default function ExerciseSide() {
  const { setToast } = useContext(Context);
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
        setToast({
          toastShow: true,
          title: "Add successfully",
          content: "Keep gooingggg",
          icon: "✔",
          bg: "success",
        });
        newModalClose();
      }
    } catch (error) {
      setToast({
        toastShow: true,
        title: "Failed to add",
        content: "Please try again later",
        icon: "❌",
        bg: "warning",
      });
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
        setToast({
          toastShow: true,
          title: "Update successfully",
          content: "Keep gooingggg",
          icon: "✔",
          bg: "success",
        });
        newModalClose();
      }
    } catch (error) {
      setToast({
        toastShow: true,
        title: "Failed to update",
        content: "Please try again later",
        icon: "❌",
        bg: "warning",
      });
    }
  };

  ///DELETE Exercise
  const handleDeleteExercise = async (id) => {
    try {
      const res = await dispatch(deleteExercise(id));
      if (unwrapResult(res)) {
        setToast({
          toastShow: true,
          title: "Delete successfully",
          content: "Keep gooingggg",
          icon: "✔",
          bg: "success",
        });
      }
    } catch (error) {
      setToast({
        toastShow: true,
        title: "Failed to delete",
        content: "Please try again later",
        icon: "❌",
        bg: "warning",
      });
    }
  };

  return (
    <Container className="admin-container mt-5">
      <div className="admin-content">
        <h2 className="admin-content-title">Manage Exercise</h2>
        <div className="d-flex justify-content-between mt-5">
          <Button
            variant="dark"
            className="myButton"
            onClick={() => newModalShow("add")}
          >
            🆕 New Exercise
          </Button>
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
