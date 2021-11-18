import React from "react";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
export default function TrainingModal({ show, handleClose }) {
  const { selectedExercise, isShow } = show;
  const embeddedLink = `https://www.youtube.com/embed/${
    selectedExercise.videoURL?.split("?v=")[1]
  }?autoplay=1`;
  return (
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
      </div>
    </Modal>
  );
}
