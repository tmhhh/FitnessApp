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
        (Exercise) => Exercise._id === _id
      );
      console.log({ updatedExerciseRef });
      setNewModal({ ...newModal, action: "update", isShown: true });
    }
  };
  const newModalClose = () => {
    setNewModal({ ...newModal, isShown: false });
  };

  const handleAddExercise = async (formData) => {
    console.log({ formData });
    const ExerciseFilterName = formData.ExerciseFilter.split(",");
    const newExercise = {
      ExerciseName: formData.ExerciseName,
      ExerciseFilter: [],
    };
    ExerciseFilterName.forEach((e) => {
      newExercise.ExerciseFilter.push({ filterName: e });
    });
    const res = await dispatch(addExercise(newExercise));
    if (unwrapResult(res)) newModalClose();
  };

  ///UPDATE Exercise
  const handleUpdateExercise = async (formData) => {
    const ExerciseFilterName = formData.ExerciseFilter.split(",");
    const updatingExercise = {
      _id: updatedExerciseRef.current._id,
      ExerciseName: formData.ExerciseName,
      ExerciseFilter: [],
    };
    ExerciseFilterName.forEach((e) => {
      updatingExercise.ExerciseFilter.push({ filterName: e });
    });
    const res = await dispatch(updateExercise(updatingExercise));
    if (unwrapResult(res)) newModalClose();
  };

  ///DELETE Exercise
  const handleDeleteExercise = async (id) => {
    dispatch(deleteExercise(id));
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
