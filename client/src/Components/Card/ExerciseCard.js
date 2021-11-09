import React from "react";
import Card from "react-bootstrap/Card";
import "./style.scss";
export default function ExerciseCard({
  info: { img, title, muscleTags },
  handleShowModal,
}) {
  const handleOnClick = () => {
    console.log(img);
  };
  return (
    <>
      <div className="exercise_card" onClick={handleOnClick}>
        <img
          className="exercise_card_image"
          variant="top"
          src={img}
          alt={title}
        />
        <div className="exercise_card_body">
          <div className="exercise_card_info">
            <i className="play-btn far fa-play-circle"></i>
            <div onClick={handleShowModal} className="exercise_card_name">
              {title}
            </div>
          </div>
          <div className="exercise_card_tags">#{muscleTags}</div>
        </div>
      </div>
    </>
  );
}
