import React from "react";
import "./style.scss";
import { Card } from "react-bootstrap";
export default function ExerciseCard({ info: { img, tag, title } }) {
  const handleOnClick = () => {
    console.log(img);
  };
  return (
    <>
      <Card className="exercise_card" onClick={handleOnClick}>
        <Card.Img className="exercise_card_image" variant="top" src={img} />
        <div className="exercise_card_tag">{tag}</div>
        <Card.Body className="exercise_card_body">
          <Card.Title className="exercise_card_name">{title}</Card.Title>
          <Card.Text className="exercise_card_like">
            123 comments,100 likes
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
