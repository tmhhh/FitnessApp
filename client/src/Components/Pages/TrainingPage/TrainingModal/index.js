import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./style.scss";
import DatePickerModal from "./DatePickerModal";
export default function TrainingModal(props) {
  const {
    show,
    handleClose,
    handleAddToTrainingSchedule,
    handleOpenDatePickerModal,
  } = props;
  const { selectedExercise, isShow } = show;
  const embeddedLink = `https://www.youtube.com/embed/${
    selectedExercise.videoURL?.split("?v=")[1]
  }?autoplay=1`;
  return (
    <>
      <Modal
        className="training__modal-container"
        centered
        show={isShow}
        onHide={handleClose}
        size="lg"
      >
        <i onClick={handleClose} className="fas fa-times close-button"></i>
        <div className="training__modal-video">
          <iframe
            src={embeddedLink}
            //   frameborder="0"
            allowfullscreen="true"
            allow="autoplay"
          ></iframe>
        </div>
        <div className="training__modal-description">
          <div className="exercise-name">{selectedExercise.name}</div>
          <div className="exercise-category">{selectedExercise.category}</div>
          <div className="exercise-description">
            {selectedExercise.description}
          </div>
          <div className="exercise-muscles">
            {selectedExercise.muscleActivate?.map((e) => (
              <div className="exercise-muscle ">#{e}</div>
            ))}
          </div>
          <button
            onClick={handleOpenDatePickerModal}
            className="common-outline-button"
            style={{ position: "absolute", bottom: "20px", right: "20px" }}
          >
            <i
              style={{ padding: "0 10px" }}
              className="far fa-calendar-plus"
            ></i>{" "}
            Add to schedule
          </button>
        </div>
      </Modal>
      <DatePickerModal {...props} />
    </>
  );
}
