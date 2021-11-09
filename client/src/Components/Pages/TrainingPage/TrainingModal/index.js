import React from "react";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
export default function TrainingModal({ show, handleClose }) {
  return (
    <Modal
      className="training__modal-container"
      centered
      show={show}
      onHide={handleClose}
      size="lg"
    >
      <i onClick={handleClose} className="fas fa-times close-button"></i>
      <div className="training__modal-video">
        <iframe
          src="https://www.youtube.com/embed/7wblGkVQx3U?autoplay=1"
          //   frameborder="0"
          //   allowfullscreen
          allow="autoplay"
          pla
        ></iframe>
      </div>
      <div className="training__modal-description">
        <div className="exercise-name">Push up</div>
        <div className="exercise-category">Weight Training</div>
        <div className="exercise-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          error, similique cupiditate reprehenderit corporis deserunt maiores,
          sapiente hic explicabo debitis unde! Ad necessitatibus modi veritatis
          magnam aut nemo, ex ea.
        </div>
        <div className="exercise-muscles">
          <div className="exercise-muscle">#Chest</div>
          <div className="exercise-muscle">#Triceps</div>
        </div>
      </div>
    </Modal>
  );
}
