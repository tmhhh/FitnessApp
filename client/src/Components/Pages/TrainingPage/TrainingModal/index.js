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
            allowfullscreen
            allow="autoplay"
            pla
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
          <Button
            onClick={handleOpenDatePickerModal}
            style={{ position: "absolute", bottom: "10px", right: "20px" }}
            variant="dark"
          >
            <i
              style={{ padding: "0 10px" }}
              className="far fa-calendar-plus"
            ></i>{" "}
            Add to schedule
          </Button>
        </div>
      </Modal>
      <DatePickerModal {...props} />
    </>
  );
}
