import React from "react";
import "./style.scss";
export default function ExerciseCard({ info: { img, title } }) {
  const handleOnClick = () => {
    console.log(img);
  };
  return (
    <>
      <div className="exercise_card" onClick={handleOnClick}>
        <img className="exercise_card_image" variant="top" src={img} />
        <div className="exercise_card_body">
          <div className="exercise_card_name">{title}</div>
          <i className="exercise_card_icon fas fa-play"></i>
        </div>
      </div>
    </>
  );
}
